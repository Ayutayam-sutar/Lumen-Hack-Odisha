import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { ToastContext } from './ToastContext';

/**
 * @typedef {Object} UserStats
 * @property {number} sessionsCompleted
 */

/**
 * @typedef {Object} AchievementContextType
 * @property {(action: 'studySessionCompleted' | 'deckCreated' | 'streakUpdated' | 'leaderboardRanked', payload?: any) => void} logAction
 * @property {(achievementId: string) => { unlocked: boolean; unlockedDate?: string }} getAchievementState
 * @property {UserStats} userStats
 */

export const AchievementContext = createContext(undefined);

export const AchievementProvider = ({ children }) => {
    const [unlockedAchievements, setUnlockedAchievements] = useState(() => {
        try {
            const saved = localStorage.getItem('unlockedAchievements');
            return saved ? JSON.parse(saved) : {};
        } catch (error) {
            console.error("Failed to parse unlocked achievements from localStorage", error);
            return {};
        }
    });

    const [userStats, setUserStats] = useState(() => {
        try {
            const saved = localStorage.getItem('userAchievementStats');
            return saved ? JSON.parse(saved) : { sessionsCompleted: 0 };
        } catch (error) {
            console.error("Failed to parse user stats from localStorage", error);
            return { sessionsCompleted: 0 };
        }
    });

    const { addToast } = useContext(ToastContext);
    const { t } = useTranslation();

    useEffect(() => {
        localStorage.setItem('unlockedAchievements', JSON.stringify(unlockedAchievements));
    }, [unlockedAchievements]);

    useEffect(() => {
        localStorage.setItem('userAchievementStats', JSON.stringify(userStats));
    }, [userStats]);

    const unlockAchievement = useCallback((achievementId) => {
        // Prevent re-unlocking and re-notifying
        if (!unlockedAchievements[achievementId]) {
            const achievementName = t(`achievements.${achievementId}`);
            if (achievementName) {
                setUnlockedAchievements(prev => ({
                    ...prev,
                    [achievementId]: { unlockedDate: new Date().toLocaleDateString() }
                }));
                addToast(`🏆 Achievement Unlocked: ${achievementName}`);
            }
        }
    }, [unlockedAchievements, addToast, t]);

    const logAction = useCallback((action, payload) => {
        switch (action) {
            case 'deckCreated':
                unlockAchievement('deckCreator');
                break;
            
            case 'studySessionCompleted':
                const newCount = userStats.sessionsCompleted + 1;
                setUserStats(prev => ({ ...prev, sessionsCompleted: newCount }));
                if (newCount >= 10) {
                    unlockAchievement('studyVeteran');
                }
                break;

            case 'streakUpdated':
                if (payload?.streak >= 7) {
                    unlockAchievement('streak7Days');
                }
                break;

            case 'leaderboardRanked':
                if (payload?.rank <= 10) {
                    unlockAchievement('top10Contender');
                }
                break;
                
            default:
                break;
        }
    }, [unlockAchievement, userStats.sessionsCompleted]);

    const getAchievementState = useCallback((achievementId) => {
        const unlockedData = unlockedAchievements[achievementId];
        return {
            unlocked: !!unlockedData,
            unlockedDate: unlockedData?.unlockedDate,
        };
    }, [unlockedAchievements]);

    const value = { logAction, getAchievementState, userStats };

    return (
        <AchievementContext.Provider value={value}>
            {children}
        </AchievementContext.Provider>
    );
};
