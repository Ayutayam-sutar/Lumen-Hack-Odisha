import React from 'react';
import { useTranslation } from 'react-i18next';
import Card from '../atoms/Card';
import Button from '../atoms/Button';

/**
 * @typedef {import('../../types').Mentor} Mentor
 */

/**
 * @typedef {Object} MentorCardProps
 * @property {Mentor} mentor
 * @property {(mentor: Mentor) => void} onSelect
 */

/**
 * A card component to display information about a mentor.
 * @param {MentorCardProps} props
 */
const MentorCard = ({ mentor, onSelect }) => {
  const { t } = useTranslation();
  return (
    <Card className="p-5 flex flex-col text-center items-center transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
      <img src={mentor.avatarUrl} alt={mentor.name} className="w-24 h-24 rounded-full mb-4 ring-4 ring-primary-200 dark:ring-primary-800" />
      <h3 className="text-xl font-bold">{mentor.name}</h3>
      <p className="text-primary font-semibold mb-2">{mentor.expertise}</p>
      <div className="flex items-center gap-4 my-3">
        <span className="font-bold text-lg">⭐️ {mentor.rating.toFixed(1)}</span>
        <div className="h-6 w-px bg-gray-300 dark:bg-gray-600"></div>
        <span className="font-bold text-lg">₹{mentor.rate}/hr</span>
      </div>
      <Button variant="accent" className="w-full mt-auto" onClick={() => onSelect(mentor)}>
        {t('doubtSolver.bookSession')}
      </Button>
    </Card>
  );
};

export default MentorCard;
