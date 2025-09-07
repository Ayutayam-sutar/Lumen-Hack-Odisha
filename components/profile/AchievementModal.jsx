import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Card from '../atoms/Card';
import Button from '../atoms/Button';
import Skeleton from '../atoms/Skeleton';
import { getWeaknessAnalysis } from '../../services/geminiService';
import { ICONS } from '../../constants';

/**
 * A component that fetches and displays an AI-generated analysis of a user's weaknesses.
 * @returns {React.ReactElement} The rendered WeaknessAnalysis component.
 */
const WeaknessAnalysis = () => {
  const { t } = useTranslation();
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAnalysis = async () => {
    setIsLoading(true);
    // In a real app, pass actual performance data
    const analysis = await getWeaknessAnalysis({ userId: 'u1' });
    setTopics(analysis);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchAnalysis();
  }, []);

  return (
    <Card className="p-6">
      <h3 className="text-xl font-bold mb-4">{t('dashboard.weaknessTitle')}</h3>
      {isLoading ? (
        <div className="space-y-3">
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
        </div>
      ) : (
        <ul className="space-y-3">
          {topics.map((topic, index) => (
            <li key={index} className="flex items-start gap-3 p-3 bg-primary-50 dark:bg-primary-900/50 rounded-lg">
                <span className="text-primary mt-1">{ICONS.aiTutor}</span>
                <p className="text-light-text dark:text-dark-text">{topic}</p>
            </li>
          ))}
        </ul>
      )}
      <Button variant="secondary" className="w-full mt-4" onClick={fetchAnalysis} disabled={isLoading}>
        {isLoading ? t('dashboard.analyzing') : t('dashboard.refreshAnalysis')}
      </Button>
    </Card>
  );
};

export default WeaknessAnalysis;

