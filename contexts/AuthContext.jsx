import React, { createContext, useState, useMemo, useEffect } from 'react';

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
 * @property {(email: string, pass: string, addXp: (amount: number) => void) => Promise<void>} login
 * @property {(name: string, email: string, pass: string, addXp: (amount: number) => void) => Promise<void>} signup
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

    useEffect(() => {
        localStorage.setItem('studyStreak', studyStreak.toString());
    }, [studyStreak]);

    const handleSuccessfulAuth = (addXp) => {
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

    const login = async (email, pass, addXp) => {
        console.log('Logging in with:', email, pass);
        await new Promise(res => setTimeout(res, 500));
        
        const generateNameFromEmail = (emailAddress) => {
            if (!emailAddress) return 'User';
            const namePart = emailAddress.split('@')[0];
            return namePart
                .replace(/[._]/g, ' ')
                .split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');
        };

        const loggedInUser = {
            id: 'u1',
            name: generateNameFromEmail(email),
            email: email,
        };
        setUser(loggedInUser);
        setIsAuthenticated(true);
        handleSuccessfulAuth(addXp);
    };

    const signup = async (name, email, pass, addXp) => {
        console.log('Signing up with:', name, email, pass);
        await new Promise(res => setTimeout(res, 500));

        // Use the name provided from the sign-up form
        const newUser = {
            id: 'u1', // In a real app, this would come from the server
            name: name,
            email: email,
        };
        setUser(newUser);
        setIsAuthenticated(true);
        handleSuccessfulAuth(addXp);
    };

    const logout = () => {
        setUser(null); // Clear user on logout
        setIsAuthenticated(false);
    };

    const value = useMemo(() => ({ user, isAuthenticated, login, signup, logout, studyStreak }), [user, isAuthenticated, studyStreak]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

