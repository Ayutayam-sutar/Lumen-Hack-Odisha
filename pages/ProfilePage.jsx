// Inside src/pages/ProfilePage.jsx

import React, { useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
// 1. We no longer need to import mockUser. mockActivity is still here for the history tab.
import { ALL_ACHIEVEMENTS, mockActivity } from '../utils/mockData';
import { AchievementContext } from '../contexts/AchievementContext';
import { AuthContext } from '../contexts/AuthContext';

import ProfileHeader from '../components/profile/ProfileHeader';
import ProfileTabs from '../components/profile/ProfileTabs';
import Overview from '../components/profile/Overview';
import AchievementsGrid from '../components/profile/AchievementsGrid';
import ActivityHistory from '../components/profile/ActivityHistory';
import AchievementModal from '../components/profile/AchievementModal';
import Skeleton from '../components/atoms/Skeleton';

const ProfilePage = () => {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState('overview');
    const [selectedAchievement, setSelectedAchievement] = useState(null);
    const achievementContext = useContext(AchievementContext);
    const { user } = useContext(AuthContext); // This 'user' object has our live data.

    // 2. The mock isLoading state and useEffect are no longer needed.
    // We will determine loading based on whether 'user' exists.

    if (!achievementContext) {
        throw new Error('ProfilePage must be used within an AchievementProvider');
    }

    // 3. This is the main loading state logic.
    // If the user object from AuthContext hasn't loaded yet, show the skeletons.
    if (!user) {
        return (
            <div className="space-y-8">
                <div className="flex items-center gap-6">
                    <Skeleton className="w-32 h-32 rounded-full" />
                    <div className="flex-1 space-y-3">
                        <Skeleton className="h-10 w-64" />
                        <Skeleton className="h-6 w-80" />
                        <Skeleton className="h-4 w-full" />
                    </div>
                </div>
                <div className="mt-8 space-y-6">
                    <Skeleton className="h-24 w-full" />
                    <Skeleton className="h-48 w-full" />
                </div>
            </div>
        );
    }
    
    // 4. Calculate extra properties like 'level' on the fly from the live user data.
    // This removes the last dependency on mockUser.
    const displayUser = {
        ...user,
        level: Math.floor(user.xp / 1000) + 1, // Example: 1000 XP = level 2
        title: t('profile.titleLearner'), // You can make this dynamic later
        avatar: `https://api.dicebear.com/8.x/bottts/svg?seed=${user.name}` // Generate an avatar from the user's name
    };


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
        switch (activeTab) {
            case 'achievements':
                return <AchievementsGrid achievements={userAchievements} onAchievementClick={handleAchievementClick} />;
            case 'history':
                return <ActivityHistory activities={mockActivity} />;
            case 'overview':
            default:
                // Pass the calculated displayUser to the Overview component
                return <Overview user={displayUser} />;
        }
    };

    return (
        <div className="space-y-8">
            {/* Pass the calculated displayUser to the ProfileHeader component */}
            <ProfileHeader user={displayUser} />
            
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