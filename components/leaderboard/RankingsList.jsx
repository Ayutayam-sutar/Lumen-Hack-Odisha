import React from 'react';

/**
 * @typedef {import('../../types').LeaderboardEntry} LeaderboardEntry
 */

/**
 * @typedef {Object} RankingsListProps
 * @property {LeaderboardEntry[]} data - An array of leaderboard entries to display.
 */

/**
 * Renders a list of ranked users for the leaderboard.
 * @param {RankingsListProps} props
 */
const RankingsList = ({ data }) => {
  return (
    <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
      {data.map((entry) => (
        <li 
            key={entry.rank} 
            className={`grid grid-cols-12 gap-4 items-center p-4 ${entry.isCurrentUser ? 'bg-primary-50 dark:bg-primary-900/50' : ''}`}
        >
            <div className="col-span-2 text-center text-lg font-bold text-light-text-muted dark:text-dark-text-muted">{entry.rank}</div>
            <div className="col-span-6 flex items-center gap-4">
                <img className="h-10 w-10 rounded-full" src={entry.avatarUrl} alt={entry.name} />
                <p className="font-semibold">{entry.name}</p>
            </div>
            <div className="col-span-4 text-right font-bold text-accent">{entry.score.toLocaleString()}</div>
        </li>
      ))}
    </ul>
  );
};

export default RankingsList;
