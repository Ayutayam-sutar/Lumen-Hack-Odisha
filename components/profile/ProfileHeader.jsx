import React from 'react';
import { useTranslation } from 'react-i18next';

/**
 * @typedef {import('../../types').User} User
 */

/**
 * @typedef {object} ProfileHeaderProps
 * @property {User} user - The user object containing profile data.
 */

/**
 * A component that displays the user's profile header, including avatar, name, level, and XP bar.
 * @param {ProfileHeaderProps} props - The props for the component.
 * @returns {React.ReactElement} The rendered ProfileHeader component.
 */
const ProfileHeader = ({ user }) => {
  const { t } = useTranslation();
  const xpPercentage = (user.xp / user.xpToNextLevel) * 100;

  return (
    <div className="flex flex-col sm:flex-row items-center gap-6">
      <img src={user.avatarUrl} alt={user.name} className="w-32 h-32 rounded-full ring-4 ring-primary ring-offset-4 dark:ring-offset-dark-bg" />
      <div className="flex-1 text-center sm:text-left">
        <h1 className="text-4xl font-bold tracking-in-expand ">{user.name}</h1>
        <p className="text-xl font-semibold text-primary">{t('profile.level')} {user.level}</p>
        <div className="mt-2">
            <div className="flex justify-between text-sm font-semibold text-light-text-muted dark:text-dark-text-muted mb-1">
                <span>{t('profile.xp')}</span>
                <span>{user.xp} / {user.xpToNextLevel}</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                <div className="bg-gradient-to-r from-accent to-primary h-3 rounded-full" style={{ width: `${xpPercentage}%` }}></div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
