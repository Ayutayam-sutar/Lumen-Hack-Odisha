// Inside src/pages/LeaderboardPage.jsx

import React, { useState, useEffect, useContext, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import apiClient from '../services/apiClient'; // 1. Import our API client
import { AuthContext } from '../contexts/AuthContext'; // 2. Import AuthContext
import LeaderboardToggle from '../components/leaderboard/LeaderboardToggle';
import RankingsList from '../components/leaderboard/RankingsList';
import Skeleton from '../components/atoms/Skeleton';
import Card from '../components/atoms/Card';

const LeaderboardPage = () => {
    const { t } = useTranslation();
    const [boardType, setBoardType] = useState('xp');
    const [isLoading, setIsLoading] = useState(true);
    const [users, setUsers] = useState([]); // 3. State to hold the raw user data from the backend
    const { user: currentUser } = useContext(AuthContext); // Get the currently logged-in user

    // 4. This useEffect now fetches real data from our new backend route
    useEffect(() => {
        const fetchLeaderboard = async () => {
            setIsLoading(true);
            try {
                const response = await apiClient.get(`/users/leaderboard?type=${boardType}`);
                setUsers(response.data);
            } catch (error) {
                console.error("Failed to fetch leaderboard data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchLeaderboard();
    }, [boardType]); // It re-runs whenever the boardType changes (XP vs Reputation)

    // 5. This useMemo hook processes the raw user data into the format our UI needs
    const processedData = useMemo(() => {
        return users.map((user, index) => ({
            rank: index + 1,
            name: user.name,
            score: boardType === 'xp' ? user.xp : user.reputation,
            avatarUrl: `https://api.dicebear.com/8.x/bottts/svg?seed=${user.name}`,
            isCurrentUser: currentUser && user._id === currentUser.id,
        }));
    }, [users, boardType, currentUser]);

    return (
        <div className="space-y-8 slide-in-top">
            <div>
                <h1 className="text-3xl font-bold">{t('leaderboard.title')}</h1>
                <p className="text-lg text-light-text-muted dark:text-dark-text-muted">{t('leaderboard.subtitle')}</p>
            </div>
            
            <div className="flex justify-center">
                <LeaderboardToggle boardType={boardType} setBoardType={setBoardType} />
            </div>

            <Card className="p-0">
                <header className="grid grid-cols-12 gap-4 p-4 font-bold border-b border-gray-200 dark:border-gray-700">
                    <div className="col-span-2">{t('leaderboard.rank')}</div>
                    <div className="col-span-6">{t('leaderboard.name')}</div>
                    <div className="col-span-4 text-right">{t('leaderboard.score')}</div>
                </header>
                {isLoading ? (
                    <div className="p-4 space-y-3">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="grid grid-cols-12 gap-4 items-center">
                                <div className="col-span-2"><Skeleton className="h-8 w-8 rounded-full" /></div>
                                <div className="col-span-6 flex items-center gap-3">
                                    <Skeleton className="h-10 w-10 rounded-full" />
                                    <Skeleton className="h-5 w-3/4" />
                                </div>
                                <div className="col-span-4 flex justify-end"><Skeleton className="h-6 w-1/2" /></div>
                            </div>
                        ))}
                    </div>
                ) : (
                    // 6. Pass the fully processed data to the RankingsList
                    <RankingsList data={processedData} />
                )}
            </Card>
        </div>
    );
};

export default LeaderboardPage;