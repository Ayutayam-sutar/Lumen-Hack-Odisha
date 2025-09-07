import React, { useState, useEffect, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { mockXpLeaderboard, mockReputationLeaderboard } from '../utils/mockData';
import LeaderboardToggle from '../components/leaderboard/LeaderboardToggle';
import RankingsList from '../components/leaderboard/RankingsList';
import Skeleton from '../components/atoms/Skeleton';
import Card from '../components/atoms/Card';
import { AchievementContext } from '../contexts/AchievementContext';

const LeaderboardPage = () => {
    const { t } = useTranslation();
    const [boardType, setBoardType] = useState('xp');
    const [isLoading, setIsLoading] = useState(true);
    const achievementContext = useContext(AchievementContext);

    if (!achievementContext) throw new Error("LeaderboardPage requires AchievementProvider");
    const { logAction } = achievementContext;

    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => {
            setIsLoading(false);
            // After data "loads", check for achievement
            const data = boardType === 'xp' ? mockXpLeaderboard : mockReputationLeaderboard;
            const currentUserEntry = data.find(entry => entry.isCurrentUser);
            if (currentUserEntry && currentUserEntry.rank <= 10) {
                logAction('leaderboardRanked', { rank: currentUserEntry.rank });
            }
        }, 1000);
        return () => clearTimeout(timer);
    }, [boardType, logAction]);

    const data = boardType === 'xp' ? mockXpLeaderboard : mockReputationLeaderboard;

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
                        {[...Array(4)].map((_, i) => (
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
                    <RankingsList data={data} />
                )}
            </Card>

        </div>
    );
};

export default LeaderboardPage;
