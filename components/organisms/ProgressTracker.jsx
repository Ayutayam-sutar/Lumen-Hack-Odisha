import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Card from '../atoms/Card';

/**
 * A component that displays a user's study progress with a bar chart
 * and key stats like study streak and weekly hours.
 * @returns {React.ReactElement} The rendered progress tracker component.
 */
const ProgressTracker = () => {
    const { t } = useTranslation();
    const [timeFilter, setTimeFilter] = useState('weekly');

    const weeklyData = [
        { day: 'Mon', hours: 2 },
        { day: 'Tue', hours: 3 },
        { day: 'Wed', hours: 1.5 },
        { day: 'Thu', hours: 4 },
        { day: 'Fri', hours: 2.5 },
        { day: 'Sat', hours: 5 },
        { day: 'Sun', hours: 1 },
    ];
    const maxHours = Math.max(...weeklyData.map(d => d.hours));

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold">{t('dashboard.progressTitle')}</h3>
        <div className="flex gap-1 p-1 bg-gray-100 dark:bg-dark-bg rounded-lg">
          <button onClick={() => setTimeFilter('weekly')} className={`px-3 py-1 text-sm font-semibold rounded-md transition-colors ${timeFilter === 'weekly' ? 'bg-white dark:bg-dark-bg-alt shadow' : 'text-light-text-muted dark:text-dark-text-muted hover:bg-gray-200 dark:hover:bg-gray-700'}`}>{t('dashboard.weekly')}</button>
          <button onClick={() => setTimeFilter('monthly')} className={`px-3 py-1 text-sm font-semibold rounded-md transition-colors ${timeFilter === 'monthly' ? 'bg-white dark:bg-dark-bg-alt shadow' : 'text-light-text-muted dark:text-dark-text-muted hover:bg-gray-200 dark:hover:bg-gray-700'}`}>{t('dashboard.monthly')}</button>
        </div>
      </div>
      <div className="flex justify-between items-end h-48 space-x-2">
        {weeklyData.map(data => (
          <div key={data.day} className="flex-1 flex flex-col items-center justify-end">
             <div className="text-sm font-semibold text-primary">{data.hours}h</div>
            <div 
              className="w-full bg-primary-200 dark:bg-primary-800 rounded-t-md hover:bg-primary transition-colors"
              style={{ height: `${(data.hours / maxHours) * 100}%` }}
              title={`${data.day}: ${data.hours} hours`}
            ></div>
            <div className="mt-2 text-sm text-light-text-muted dark:text-dark-text-muted">{data.day}</div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-around">
        <div className="text-center">
            <div className="text-2xl font-bold text-accent">🔥 12</div>
            <div className="text-sm text-light-text-muted dark:text-dark-text-muted">{t('dashboard.currentStreak')}</div>
        </div>
        <div className="text-center">
            <div className="text-2xl font-bold text-primary">19h</div>
            <div className="text-sm text-light-text-muted dark:text-dark-text-muted">{t('dashboard.thisWeek')}</div>
        </div>
      </div>
    </Card>
  );
};

export default ProgressTracker;
