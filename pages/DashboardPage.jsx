import React, { useContext } from 'react'; // 1. Import useContext
import { useTranslation } from 'react-i18next';
import ProgressTracker from '../components/organisms/ProgressTracker';
import WeaknessAnalysis from '../components/organisms/WeaknessAnalysis';
import Recommendations from '../components/organisms/Recommendations';
import { AuthContext } from '../contexts/AuthContext'; // 2. Import the AuthContext

const DashboardPage = () => {
  const { t } = useTranslation();
  const { user } = useContext(AuthContext); // 3. Get the user from the context

  return (
    <div className="slide-in-top space-y-8">
      <div>
        {/* 4. Use the user's name from the context, with a fallback */}
        <h1 className="text-3xl font-bold mb-2">{t('dashboard.welcome', { name: user?.name || 'Learner' })}</h1>
        <p className="text-lg text-light-text-muted dark:text-dark-text-muted">{t('dashboard.subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
            <ProgressTracker />
        </div>
        <div>
            <WeaknessAnalysis />
        </div>
      </div>
      <Recommendations />

    </div>
  );
};

export default DashboardPage;

