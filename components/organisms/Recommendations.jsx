import React from 'react';
import { useTranslation } from 'react-i18next';
import Card from '../atoms/Card';
import { mockDecks, mockGroups } from '../../utils/mockData';
import Button from '../atoms/Button';
import { Link } from 'react-router-dom';

/**
 * A component that displays recommended study decks and groups to the user.
 * @returns {React.ReactElement} The rendered recommendations component.
 */
const Recommendations = () => {
  const { t } = useTranslation();
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{t('dashboard.recommendationsTitle')}</h2>
      <div className="space-y-8">
        <div>
          <h3 className="text-xl font-semibold mb-3">{t('dashboard.suggestedDecks')}</h3>
          <div className="flex gap-6 pb-4 -mx-8 px-8 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
            {mockDecks.map(deck => (
              <Card key={deck.id} className=" hover:shadow-lg hover:shadow-orange-400/50 hover:outline hover:outline-offset-1 hover:outline-1 hover:outline-orange-400 p-4 flex flex-col justify-between flex-shrink-0 w-72">
                <div>
                  <h4 className="font-bold">{deck.title}</h4>
                  <p className="text-sm text-light-text-muted dark:text-dark-text-muted">{deck.cardCount} {t('flashcardForge.cards')}</p>
                </div>
                <Link to={`/app/decks/${deck.id}`}>
                    <Button variant="secondary" className="mt-4 w-full">{t('dashboard.study')}</Button>
                </Link>
              </Card>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-3">{t('dashboard.suggestedGroups')}</h3>
          <div className="flex gap-6 pb-4 -mx-8 px-8 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
            {mockGroups.map(group => (
              <Card key={group.id} className="hover:shadow-lg hover:shadow-orange-400/50 hover:outline hover:outline-offset-1 hover:outline-1 hover:outline-orange-400 p-4 flex flex-col justify-between flex-shrink-0 w-72">
                <div>
                  <h4 className="font-bold">{group.name}</h4>
                  <p className="text-sm text-light-text-muted dark:text-dark-text-muted">{group.subject}</p>
                </div>
                 <Link to="/app/groups">
                    <Button variant="secondary" className="mt-4 w-full">{t('dashboard.join')}</Button>
                 </Link>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recommendations;
