import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import MentorCard from './MentorCard';
import Skeleton from '../atoms/Skeleton';
import Card from '../atoms/Card';

/**
 * @typedef {import('../../types').Mentor} Mentor
 */

/**
 * @typedef {Object} MentorListProps
 * @property {Mentor[]} mentors
 * @property {'online' | 'offline'} mode
 * @property {(mentor: Mentor) => void} onSelectMentor
 */

/**
 * Renders a list of mentors, with loading states and filtering by mode.
 * @param {MentorListProps} props
 */
const MentorList = ({ mentors, mode, onSelectMentor }) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const filteredMentors = mentors.filter(mentor => mentor.modes.includes(mode));
  
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [mode]);


  return (
    <div>
        <h2 className="text-2xl font-bold mb-4 capitalize">{t('doubtSolver.mentorsAvailable', { mode })}</h2>
        {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(3)].map((_, i) => (
                    <Card key={i} className="p-5 flex flex-col items-center space-y-3">
                        <Skeleton className="w-24 h-24 rounded-full" />
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-5 w-1/2" />
                        <Skeleton className="h-8 w-3/4" />
                        <Skeleton className="h-10 w-full" />
                    </Card>
                ))}
            </div>
        ) : filteredMentors.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMentors.map(mentor => (
                <MentorCard key={mentor.id} mentor={mentor} onSelect={onSelectMentor} />
            ))}
            </div>
        ) : (
            <div className="text-center py-12 bg-light-bg-alt dark:bg-dark-bg-alt rounded-lg">
                <p className="text-xl text-light-text-muted dark:text-dark-text-muted">{t('doubtSolver.noMentors', { mode })}</p>
                <p className="mt-2">{t('doubtSolver.noMentorsSuggestion')}</p>
            </div>
        )}
    </div>
  );
};

export default MentorList;
