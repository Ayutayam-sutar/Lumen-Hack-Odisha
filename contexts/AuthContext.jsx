// Inside src/contexts/AuthContext.jsx

import React, { createContext, useState, useMemo, useEffect } from 'react';
import axios from 'axios';
// We no longer need jwt-decode here since the backend will provide the user data
// import { jwtDecode } from 'jwt-decode';

import apiClient, { setAuthToken } from '../services/apiClient'; 


/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} name
 * @property {string} email
 */

/**
 * @typedef {Object} AuthContextType
 * @property {User | null} user
 * @property {boolean} isAuthenticated
 * @property {number} studyStreak
 * @property {(name: string, email: string, pass: string, addXp: (amount: number) => void) => Promise<void>} signup
 * @property {(email: string, pass: string, addXp: (amount: number) => void) => Promise<void>} login
 * @property {() => void} logout
 */

export const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [studyStreak, setStudyStreak] = useState(() => {
        const savedStreak = localStorage.getItem('studyStreak');
        return savedStreak ? parseInt(savedStreak, 10) : 0;
    });

    // NEW: Function to load user data using a token
    const loadUser = async () => {
        const token = localStorage.getItem('authToken');
        if (token) {
            setAuthToken(token); // Set the token header
            try {
                // Fetch user data from our new protected route
                const res = await apiClient.get('/users/me');
                setUser(res.data); // Set user state with real data
                setIsAuthenticated(true);
            } catch (err) {
                // If token is invalid or expired, clear it
                localStorage.removeItem('authToken');
                setIsAuthenticated(false);
            }
        }
    };

    // This effect runs once when the app loads to check for an existing token
    useEffect(() => {
        loadUser();
    }, []);

    useEffect(() => {
        localStorage.setItem('studyStreak', studyStreak.toString());
    }, [studyStreak]);

    const handleSuccessfulAuth = (addXp) => {
        // This gamification logic remains the same.
        const today = new Date();
        const todayStr = today.toISOString().split('T')[0];
        const lastLoginStr = localStorage.getItem('lastLoginDate');

        if (lastLoginStr !== todayStr) {
            const yesterday = new Date(today);
            yesterday.setDate(today.getDate() - 1);
            const yesterdayStr = yesterday.toISOString().split('T')[0];

            if (lastLoginStr === yesterdayStr) {
                setStudyStreak(prev => prev + 1);
            } else {
                setStudyStreak(1);
            }

            addXp(10); // Daily login/signup reward
            localStorage.setItem('lastLoginDate', todayStr);
        }
    };

    const signup = async (name, email, password, addXp) => {
        try {
            await apiClient.post('/users/register', { name, email, password });
            await login(email, password, addXp);
        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                throw new Error(err.response.data.message);
            }
            throw new Error('An unexpected error occurred during signup.');
        }
    };

    const login = async (email, password, addXp) => {
        try {
            const response = await apiClient.post('/users/login', { email, password });
            const { token } = response.data;

            localStorage.setItem('authToken', token);

            // NEW: After getting the token, load the user's data
            await loadUser();

            handleSuccessfulAuth(addXp);
        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                throw new Error(err.response.data.message);
            }
            throw new Error('An unexpected error occurred during login.');
        }
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        setAuthToken(null); // Clear the auth header
        setUser(null);
        setIsAuthenticated(false);
    };

    const value = useMemo(() => ({ user, isAuthenticated, login, signup, logout, studyStreak ,loadUser }), [user, isAuthenticated, studyStreak]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};