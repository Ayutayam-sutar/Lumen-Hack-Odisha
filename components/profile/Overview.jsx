import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import Card from '../atoms/Card';
import { AuthContext } from '../../contexts/AuthContext';

/**
 * @typedef {import('../../types').User} User
 */

/**
 * @typedef {object} StatCardProps
 * @property {number | string} value - The value to display in the card.
 * @property {string} label - The label for the statistic.
 * @property {string} icon - The emoji icon for the statistic.
 */

/**
 * A component to display a single statistic in a card.
 * @param {StatCardProps} props - The props for the component.
 * @returns {React.ReactElement} The rendered StatCard component.
 */
const StatCard = ({ value, label, icon }) => (
  <Card className="p-6 text-center flex flex-col items-center gap-3 hover:shadow-lg hover:shadow-orange-400/50 hover:outline hover:outline-offset-1 hover:outline-1 hover:outline-orange-400">
    <div className="text-5xl">{icon}</div>
    <div className="text-4xl font-extrabold text-primary">{value}</div>
    <p className="text-light-text-muted dark:text-dark-text-muted font-semibold">{label}</p>
  </Card>
);

/**
 * @typedef {object} OverviewProps
 * @property {User} user - The user object containing profile data.
 */

/**
 * A component that displays an overview of the user's stats.
 * @param {OverviewProps} props - The props for the component.
 * @returns {React.ReactElement} The rendered Overview component.
 */
const Overview = ({ user }) => {
  const { t } = useTranslation();
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('Overview must be used within an AuthProvider');
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">{t('profile.statsTitle')}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard value={authContext.studyStreak} label={t('profile.currentStudyStreak')} icon="🔥" />
        <StatCard value={user.xp} label={t('profile.totalXp')} icon="✨" />
        <StatCard value={user.reputation} label={t('profile.communityReputation')} icon="💖" />
      </div>
    </div>
  );
};

export default Overview;
