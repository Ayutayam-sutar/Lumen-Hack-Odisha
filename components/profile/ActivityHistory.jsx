import React from 'react';
import Card from '../atoms/Card';

/**
 * @typedef {import('../../types').Activity} Activity
 */

/**
 * @typedef {object} ActivityHistoryProps
 * @property {Activity[]} activities - The list of user activities.
 */

/**
 * A component that displays a timeline of user activities.
 * @param {ActivityHistoryProps} props - The props for the component.
 * @returns {React.ReactElement} The rendered ActivityHistory component.
 */
const ActivityHistory = ({ activities }) => {
  return (
    <div className="mt-8 flow-root">
      <ul role="list" className="-mb-8">
        {activities.map((activity, activityIdx) => (
          <li key={activity.id}>
            <div className="relative pb-8">
              {activityIdx !== activities.length - 1 ? (
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
                    <span className="font-bold text-accent ml-2">+{activity.xpGained} XP</span>
                  </div>
                  <div className="text-sm text-light-text-muted dark:text-dark-text-muted">
                    <p>{activity.timestamp}</p>
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
