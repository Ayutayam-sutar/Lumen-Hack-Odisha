// Inside src/components/profile/ActivityHistory.jsx

import React from 'react';
import { useTranslation } from 'react-i18next';

// A simple helper function to format the date from the database
const formatTimestamp = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

const ActivityHistory = ({ activities }) => {
    const { t } = useTranslation();

    // Show a message if there's no activity yet
    if (!activities || activities.length === 0) {
        return (
            <div className="mt-8 text-center text-light-text-muted dark:text-dark-text-muted">
                <p>{t('profile.noActivity', 'No recent activity to show.')}</p>
            </div>
        );
    }
    
    return (
        <div className="mt-8 flow-root">
            <ul role="list" className="-mb-8">
                {/* 1. We now get the 'index' to use as a key */}
                {activities.map((activity, index) => (
                    <li key={index}>
                        <div className="relative pb-8">
                            {index !== activities.length - 1 ? (
                                <span className="absolute left-5 top-5 -ml-px h-full w-0.5 bg-gray-200 dark:bg-gray-700" aria-hidden="true" />
                            ) : null}
                            <div className="relative flex items-start space-x-3">
                                <div>
                                    <div className="relative px-1">
                                        <div className="flex h-10 w-10 bg-primary-100 dark:bg-primary-900 rounded-full ring-4 ring-light-bg-alt dark:ring-dark-bg-alt items-center justify-center">
                                            <span className="text-xl">🎉</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="min-w-0 flex-1 py-1.5">
                                    <div className="text-md text-light-text dark:text-dark-text">
                                        {activity.text}
                                        {activity.xpGained > 0 && (
                                            <span className="font-bold text-accent ml-2">+{activity.xpGained} XP</span>
                                        )}
                                    </div>
                                    <div className="text-sm text-light-text-muted dark:text-dark-text-muted">
                                        {/* 2. We use our helper function to format the date */}
                                        <p>{formatTimestamp(activity.date)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ActivityHistory;