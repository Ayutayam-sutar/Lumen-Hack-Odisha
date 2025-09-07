import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import StudySession from '../components/organisms/StudySession';
import { mockDecks } from '../utils/mockData';

const StudySessionPage = () => {
    const { deckId } = useParams();
    const { t } = useTranslation();
    const deck = mockDecks.find(d => d.id === deckId);

    // Mocking flashcards for the selected deck
    const mockCards = Array.from({ length: 10 }, (_, i) => ({
        id: `${deckId}-c${i + 1}`,
        question: `What is the core concept #${i + 1} of ${deck?.title}?`,
        answer: `The core concept #${i + 1} is a fundamental principle related to ${deck?.tags.join(', ')}.`,
        srsLevel: 0,
        nextReviewDate: new Date(),
    }));

    if (!deck) {
        return (
            <div className="text-center">
                <h2 className="text-2xl font-bold">{t('studySession.deckNotFound')}</h2>
                <Link to="/app/decks" className="text-primary hover:underline">{t('studySession.returnToDecks')}</Link>
            </div>
        );
    }

    return (
        <div>
            <h1 className="text-3xl font-bold mb-2 text-center">{t('studySession.studying', { title: deck.title })}</h1>
            <p className="text-lg text-light-text-muted dark:text-dark-text-muted mb-8 text-center">{deck.description}</p>
            
            <StudySession cards={mockCards} />
        </div>
    );
};

export default StudySessionPage;
