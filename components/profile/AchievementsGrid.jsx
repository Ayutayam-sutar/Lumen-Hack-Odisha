import React from 'react';
import { useTranslation } from 'react-i18next';
import Card from '../atoms/Card';

/**
 * @typedef {import('../../types').Achievement} Achievement
 */

/**
 * @typedef {object} AchievementsGridProps
 * @property {Achievement[]} achievements - The list of achievements to display.
 * @property {(achievement: Achievement) => void} onAchievementClick - Function to call when an achievement is clicked.
 */

/**
 * A component that displays a grid of achievements.
 * @param {AchievementsGridProps} props - The props for the component.
 * @returns {React.ReactElement} The rendered AchievementsGrid component.
 */
const AchievementsGrid = ({ achievements, onAchievementClick }) => {
  const { t } = useTranslation();

  return (
    <div className="mt-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievements.map(ach => (
          <Card
            key={ach.id}
            className={`p-6 flex flex-col items-center text-center gap-4 transition-all duration-300 ${ach.unlocked ? 'hover:shadow-lg hover:shadow-orange-400/50 hover:outline hover:outline-offset-1 hover:outline-1 hover:outline-orange-400 cursor-pointer hover:shadow-xl hover:-translate-y-1' : 'opacity-50'}`}
            onClick={() => onAchievementClick(ach)}
            title={ach.unlocked ? t('profile.viewDetails', 'View Details') : t('profile.locked', 'Locked')}
          >
            <div className={`text-6xl ${ach.unlocked ? '' : 'filter grayscale'}`}>{ach.icon}</div>
            <div>
              <h3 className="font-bold text-lg">{ach.name}</h3>
              <p className="text-sm text-light-text-muted dark:text-dark-text-muted">{ach.description}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AchievementsGrid;
