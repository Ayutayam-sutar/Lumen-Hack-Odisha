import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Card from '../components/atoms/Card';
import Button from '../components/atoms/Button';
import Skeleton from '../components/atoms/Skeleton';
import { mockDecks } from '../utils/mockData';
import Input from '../components/atoms/Input';
import { GamificationContext } from '../contexts/GamificationContext';
import { AchievementContext } from '../contexts/AchievementContext';
import { generateFlashcards } from '../services/geminiService';
import { ICONS } from '../constants';

const AIDeckForge = ({ onSaveDeck }) => { // <-- 1. Accept the onSaveDeck prop
    const { t } = useTranslation();
    const gamification = useContext(GamificationContext);
    const achievementContext = useContext(AchievementContext);
    
    const [topic, setTopic] = useState('');
    const [cardCount, setCardCount] = useState(5);
    const [isLoading, setIsLoading] = useState(false);
    const [generatedDeck, setGeneratedDeck] = useState(null);
    const [error, setError] = useState('');

    if (!achievementContext) throw new Error("DeckBuilder must be used within AchievementProvider");

    const handleGenerate = async () => {
        if (!topic.trim()) return;
        setIsLoading(true);
        setError('');
        setGeneratedDeck(null);
        try {
            const result = await generateFlashcards(topic, cardCount);
            setGeneratedDeck(result);
        } catch (err) {
            setError(t('flashcardForge.errorGenerating'));
        } finally {
            setIsLoading(false);
        }
    };

    const handleSaveDeck = () => {
        // --- 2. Call the onSaveDeck function passed from the parent ---
        if (generatedDeck && typeof onSaveDeck === 'function') {
            onSaveDeck(generatedDeck);
        }

        if(gamification) {
            gamification.addXp(100);
        }
        achievementContext.logAction('deckCreated');

        // Reset the AI forge state
        setGeneratedDeck(null);
        setTopic('');
    };
    
    const handleReset = () => {
        setGeneratedDeck(null);
        setTopic('');
        setError('');
    }

    return (
        <Card className="p-6">
            <h2 className="text-2xl font-bold mb-1">{t('flashcardForge.aiDeckForgeTitle')}</h2>
            <p className="text-light-text-muted dark:text-dark-text-muted mb-4">{t('flashcardForge.aiDeckForgeSubtitle')}</p>
            
            {isLoading && (
                 <div className="flex flex-col items-center justify-center p-8 space-y-3">
                     <svg className="animate-spin h-8 w-8 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                     <p className="font-semibold text-lg">{t('flashcardForge.generating')}</p>
                     <p className="text-sm text-light-text-muted dark:text-dark-text-muted">{t('flashcardForge.generatingMessage')}</p>
                 </div>
            )}

            {!isLoading && !generatedDeck && (
                <div className="space-y-4">
                    <Input 
                        label={t('flashcardForge.topicLabel')}
                        placeholder={t('flashcardForge.topicPlaceholder')}
                        value={topic}
                        onChange={e => setTopic(e.target.value)}
                    />
                     <div>
                         <label className="block text-sm font-medium text-light-text-muted dark:text-dark-text-muted mb-1">{t('flashcardForge.cardCountLabel')}</label>
                         <select
                             value={cardCount}
                             onChange={(e) => setCardCount(Number(e.target.value))}
                             className="w-full px-3 py-2 bg-gray-50 dark:bg-dark-bg border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                         >
                             <option value={5}>5</option>
                             <option value={10}>10</option>
                             <option value={15}>15</option>
                         </select>
                    </div>
                    {error && <p className="text-red-500">{error}</p>}
                    <Button className="hover:bg-gradient-to-r from-primary to-accent" variant="primary" onClick={handleGenerate} disabled={!topic.trim()}>
                       {ICONS.aiTutor} {t('flashcardForge.generateWithAI')}
                    </Button>
                </div>
            )}
            
            {!isLoading && generatedDeck && (
                <div className="space-y-4">
                    <h3 className="text-xl font-bold">{generatedDeck.title}</h3>
                    <p>{generatedDeck.description}</p>
                    <div className="space-y-3 max-h-60 overflow-y-auto p-3 bg-gray-50 dark:bg-dark-bg rounded-lg border border-gray-200 dark:border-gray-700">
                        {generatedDeck.cards.map((card, index) => (
                            <div key={index} className="p-2 border-b border-gray-200 dark:border-gray-600">
                                <p><strong>Q:</strong> {card.question}</p>
                                <p><strong>A:</strong> {card.answer}</p>
                            </div>
                        ))}
                    </div>
                    <div className="flex gap-4">
                        <Button variant="secondary" onClick={handleReset}>{t('flashcardForge.discard')}</Button>
                        <Button className="hover:bg-gradient-to-r from-primary to-accent" variant="accent" onClick={handleSaveDeck}>{t('flashcardForge.saveDeck')}</Button>
                    </div>
                </div>
            )}
        </Card>
    );
}

const FlashcardForgePage = () => {
    const { t } = useTranslation();
    const [decks, setDecks] = useState(mockDecks); // <-- 3. Manage decks in state
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 1500);
        return () => clearTimeout(timer);
    }, []);

    // --- 4. Function to add the new deck to the state ---
    const handleSaveNewDeck = (newDeckData) => {
        const newDeck = {
            id: `d${decks.length + 1}`, // Simple ID generation
            ...newDeckData,
            cardCount: newDeckData.cards.length,
            author: 'AI Assistant' // or current user
        };
        setDecks(prevDecks => [newDeck, ...prevDecks]);
    };
 
    const filteredDecks = decks.filter(deck => // <-- 5. Filter the state variable
      deck.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      deck.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="space-y-8">
        <div>
            <h1 className="text-3xl font-bold">{t('flashcardForge.title')}</h1>
            <p className="text-lg text-light-text-muted dark:text-dark-text-muted">{t('flashcardForge.subtitle')}</p>
        </div>

        <AIDeckForge onSaveDeck={handleSaveNewDeck} /> {/* <-- 6. Pass the handler to the child */}

        <div>
            <div className="flex justify-between items-center mb-4 gap-4">
                <h2 className="text-2xl font-bold">{t('flashcardForge.yourDecks')}</h2>
                <div className="w-full max-w-sm">
                    <Input 
                        placeholder={t('flashcardForge.searchPlaceholder')}
                        value={searchTerm} 
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
                [...Array(3)].map((_, i) => (
                    <Card key={i} className="p-6 space-y-4">
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-4 w-1/4" />
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                    </Card>
                ))
            ) : (
                filteredDecks.map(deck => (
                    <Card key={deck.id} className="p-6 flex flex-col justify-between">
                        <div>
                            <h3 className="text-xl font-bold">{deck.title}</h3>
                            <p className="text-light-text-muted dark:text-dark-text-muted mb-2">{deck.cardCount} {t('flashcardForge.cards')}</p>
                            <p className="text-sm mb-4">{deck.description}</p>
                        </div>
                        <Link to={`/app/decks/${deck.id}`}>
                            <Button  variant="accent" className="hover:bg-gradient-to-r from-primary to-accent w-full">{t('flashcardForge.startStudying')}</Button>
                        </Link>
                    </Card>
                ))
            )}
            </div>
      </div>
    </div>
  );
};

export default FlashcardForgePage;
