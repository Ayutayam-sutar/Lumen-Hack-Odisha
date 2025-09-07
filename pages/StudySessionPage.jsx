// Inside src/pages/StudySessionPage.jsx

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import apiClient from '../services/apiClient'; // Import our API client
import StudySession from '../components/organisms/StudySession';
import Skeleton from '../components/atoms/Skeleton'; // Import Skeleton for loading
import Button from '../components/atoms/Button';

const StudySessionPage = () => {
    const { deckId } = useParams();
    const { t } = useTranslation();

    // State for fetching data
    const [deck, setDeck] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // This useEffect fetches the specific deck from your backend
    useEffect(() => {
        const fetchDeck = async () => {
            try {
                setIsLoading(true);
                const response = await apiClient.get(`/decks/${deckId}`);
                setDeck(response.data);
            } catch (err) {
                setError(t('studySession.deckNotFound', 'Deck not found!'));
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        if (deckId) {
            fetchDeck();
        }
    }, [deckId, t]);

    if (isLoading) {
        return (
            <div className="text-center">
                 <Skeleton className="h-10 w-3/4 mx-auto mb-8" />
                 <Skeleton className="h-80 w-full max-w-2xl mx-auto" />
            </div>
        );
    }

    if (error || !deck) {
        return (
            <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">{error || t('studySession.deckNotFound')}</h2>
                <Link to="/app/decks">
                    <Button variant="primary">{t('studySession.returnToDecks', 'Return to Decks')}</Button>
                </Link>
            </div>
        );
    }

    return (
        <div>
            <h1 className="text-3xl font-bold mb-2 text-center">{t('studySession.studying', { title: deck.title })}</h1>
            <p className="text-lg text-light-text-muted dark:text-dark-text-muted mb-8 text-center">{deck.description}</p>
            
            {/* We now pass the real cards from the fetched deck to your component */}
            {deck.cards && deck.cards.length > 0 ? (
                 <StudySession cards={deck.cards} deckId={deck._id} />
            ) : (
                <p className="text-center">{t('studySession.noCards', 'This deck has no cards.')}</p>
            )}
        </div>
    );
};

export default StudySessionPage;