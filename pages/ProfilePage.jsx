import React, { useEffect, useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { mockUser, ALL_ACHIEVEMENTS, mockActivity } from '../utils/mockData';
import { AchievementContext } from '../contexts/AchievementContext';
import { AuthContext } from '../contexts/AuthContext';

// 1. Import your official ProfileHeader component
import ProfileHeader from '../components/profile/ProfileHeader';
import ProfileTabs from '../components/profile/ProfileTabs';
import Overview from '../components/profile/Overview';
import AchievementsGrid from '../components/profile/AchievementsGrid';
import ActivityHistory from '../components/profile/ActivityHistory';
import AchievementModal from '../components/profile/AchievementModal';
import Skeleton from '../components/atoms/Skeleton';

// 2. The temporary, inlined ProfileHeader component has been removed.

const ProfilePage = () => {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState('overview');
    const [selectedAchievement, setSelectedAchievement] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const achievementContext = useContext(AchievementContext);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 1200);
        return () => clearTimeout(timer);
    }, []);

    // 3. Merge mock data with the logged-in user's data.
    // This ensures all properties (like xp, level) are available for the ProfileHeader.
    const displayUser = { ...mockUser, ...user };

    if (!achievementContext) {
        throw new Error('ProfilePage must be used within an AchievementProvider');
    }

    const userAchievements = ALL_ACHIEVEMENTS.map(ach => {
        const state = achievementContext.getAchievementState(ach.id);
        return {
            ...ach,
            name: t(`achievements.${ach.id}`),
            description: t(`achievements.${ach.id}_desc`),
            unlocked: state.unlocked,
            unlockedDate: state.unlockedDate,
        };
    });

    const handleAchievementClick = (achievement) => {
        setSelectedAchievement(achievement);
    };

    const renderContent = () => {
        if (isLoading) {
            return (
                <div className="mt-8 space-y-6">
                    <Skeleton className="h-24 w-full" />
                    <Skeleton className="h-48 w-full" />
                </div>
            );
        }
        
        switch (activeTab) {
            case 'achievements':
                return <AchievementsGrid achievements={userAchievements} onAchievementClick={handleAchievementClick} />;
            case 'history':
                return <ActivityHistory activities={mockActivity} />;
            case 'overview':
            default:
                return <Overview user={displayUser} />;
        }
    };

    return (
        <div className="space-y-8">
            {isLoading ? (
                <div className="flex items-center gap-6">
                    <Skeleton className="w-32 h-32 rounded-full" />
                    <div className="space-y-3">
                        <Skeleton className="h-10 w-64" />
                        <Skeleton className="h-6 w-80" />
                        <Skeleton className="h-4 w-full" />
                    </div>
                </div>
            ) : (
                // 4. Use your official ProfileHeader component
                <ProfileHeader user={displayUser} />
            )}
            
            <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />
            
            <div>
                {renderContent()}
            </div>

            <AchievementModal
                isOpen={!!selectedAchievement}
                onClose={() => setSelectedAchievement(null)}
                achievement={selectedAchievement}
            />
        </div>
    );
};

export default ProfilePage;

