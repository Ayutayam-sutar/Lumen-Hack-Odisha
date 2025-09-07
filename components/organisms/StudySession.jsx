// Inside src/components/organisms/StudySession.jsx

import React, { useState, useContext, useEffect } from 'react'; // 1. Import useEffect
import { useTranslation } from 'react-i18next';
import Card from '../atoms/Card';
import Button from '../atoms/Button';
import { GamificationContext } from '../../contexts/GamificationContext';
import { AchievementContext } from '../../contexts/AchievementContext';
import { AuthContext } from '../../contexts/AuthContext'; // 1. Import AuthContext

import apiClient from '../../services/apiClient';

const StudySession = ({ cards, deckId }) => {
    const { t } = useTranslation();
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [sessionFinished, setSessionFinished] = useState(false);
    const [progress, setProgress] = useState(0);
    const gamification = useContext(GamificationContext);
    const achievementContext = useContext(AchievementContext);
     const { loadUser } = useContext(AuthContext);
    // 2. Add state to store the session start time
    const [startTime, setStartTime] = useState(null);

    // 3. This effect runs once when the session starts to record the time
    useEffect(() => {
        setStartTime(Date.now());
    }, []);

    if (!achievementContext) throw new Error("StudySession must be used within AchievementProvider");

    const handleFlip = () => setIsFlipped(prev => !prev);
    
    // 4. New function to log the study session to the backend
    const logStudySession = async () => {
        if (startTime) {
            const endTime = Date.now();
            const durationInSeconds = (endTime - startTime) / 1000;
            const durationInMinutes = Math.round(durationInSeconds / 60);

            // Don't log sessions that are too short
            if (durationInMinutes > 0) {
                try {
                    await apiClient.post('/users/log-study', { duration: durationInMinutes });
                    console.log(`Logged study session of ${durationInMinutes} minutes.`);
                } catch (error) {
                    console.error("Failed to log study session:", error);
                }
            }
        }
    };

    const handleConfidence = async (level) => {
        const card = cards[currentCardIndex];
        try {
            await apiClient.put(`/decks/${deckId}/cards/${card._id}/review`, { confidence: level });
        } catch (error) {
            console.error("Failed to update card SRS data:", error);
        }
        
        if (currentCardIndex < cards.length - 1) {
            const newIndex = currentCardIndex + 1;
            setCurrentCardIndex(newIndex);
            setIsFlipped(false);
            setProgress(((newIndex) / cards.length) * 100);
        } else {
            // 5. When the session is finished, call our new log function
            logStudySession(); 
            
            setSessionFinished(true);
            setProgress(100);
            gamification.addXp(50);
            achievementContext.logAction('studySessionCompleted');
        }
    };
    
    const handleReset = () => {
        setCurrentCardIndex(0);
        setSessionFinished(false);
        setIsFlipped(false);
        setProgress(0);
        setStartTime(Date.now()); // Reset the timer when starting over
    }

    if (sessionFinished) {
        return (
            <Card className="p-8 text-center">
                <h2 className="text-2xl font-bold mb-4">{t('studySession.sessionComplete')}</h2>
                <p>{t('studySession.sessionCompleteMessage')}</p>
                <Button onClick={handleReset} className="mt-6">{t('studySession.startOver')} </Button>
            </Card>
        );
    }

    const card = cards[currentCardIndex];

    return (
        <div className="max-w-2xl mx-auto">
            <div className="mb-4">
                <div className="flex justify-between items-center mb-1">
                    <p className="text-sm font-semibold text-primary">{t('studySession.progress')}</p>
                    <p className="text-sm font-semibold text-primary">{Math.round(progress)}%</p>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div className="bg-primary h-2.5 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
                </div>
            </div>

            <p className="text-center text-light-text-muted dark:text-dark-text-muted mb-4">{t('studySession.card', { current: currentCardIndex + 1, total: cards.length })}</p>
            
            <div className="[perspective:1000px]">
                <div 
                    className={`relative w-full min-h-[24rem] transition-transform duration-500 [transform-style:preserve-3d] ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}
                    onClick={handleFlip}
                >
                    <Card className="absolute inset-0 w-full h-full flex flex-col justify-center items-center p-8 cursor-pointer select-none [backface-visibility:hidden]">
                        <p className="text-3xl font-semibold text-center">{card.question}</p>
                    </Card>
                    <Card className="absolute inset-0 w-full h-full flex flex-col justify-center items-center p-8 cursor-pointer select-none [backface-visibility:hidden] [transform:rotateY(180deg)]">
                        <p className="text-2xl text-center text-primary dark:text-primary-300">{card.answer}</p>
                    </Card>
                </div>
            </div>
            
            {isFlipped ? (
                <div className="mt-6">
                    <p className="text-center mb-4 font-semibold">{t('studySession.confidencePrompt')}</p>
                    <div className="grid grid-cols-4 gap-4">
                        <Button onClick={() => handleConfidence('again')} className="!bg-red-500 hover:!bg-red-600 text-white">{t('studySession.again')}</Button>
                        <Button onClick={() => handleConfidence('hard')} className="!bg-orange-500 hover:!bg-orange-600 text-white">{t('studySession.hard')}</Button>
                        <Button onClick={() => handleConfidence('good')} className="!bg-green-500 hover:!bg-green-600 text-white">{t('studySession.good')}</Button>
                        <Button onClick={() => handleConfidence('easy')} className="!bg-blue-500 hover:!bg-blue-600 text-white">{t('studySession.easy')}</Button>
                    </div>
                </div>
            ) : (
                <Button onClick={handleFlip} className="w-full mt-6" variant="primary">{t('studySession.showAnswer')}</Button>
            )}
        </div>
    );
};

export default StudySession;