import React, { useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import Card from '../atoms/Card';
import Button from '../atoms/Button';
import { GamificationContext } from '../../contexts/GamificationContext';
import { AchievementContext } from '../../contexts/AchievementContext';

/**
 * @typedef {object} Flashcard
 * @property {string} id
 * @property {string} question
 * @property {string} answer
 * @property {number} srsLevel
 * @property {Date} nextReviewDate
 */

/**
 * @typedef {object} StudySessionProps
 * @property {Flashcard[]} cards - An array of flashcard objects to be studied.
 */

/**
 * A component that manages a flashcard study session, including card flipping,
 * progress tracking, and confidence rating.
 * @param {StudySessionProps} props - The props for the StudySession component.
 * @returns {React.ReactElement} The rendered study session component.
 */
const StudySession = ({ cards }) => {
  const { t } = useTranslation();
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [sessionFinished, setSessionFinished] = useState(false);
  const [progress, setProgress] = useState(0);
  const gamification = useContext(GamificationContext);
  const achievementContext = useContext(AchievementContext);

  if (!achievementContext) throw new Error("StudySession must be used within AchievementProvider");

  const handleFlip = () => setIsFlipped(prev => !prev);

  /**
   * Handles the user's confidence rating for the current card.
   * @param {'again' | 'hard' | 'good' | 'easy'} level - The confidence level selected by the user.
   */
  const handleConfidence = (level) => {
    // In a real SRS, you'd update the card's srsLevel and nextReviewDate here.
    console.log(`Card ${cards[currentCardIndex].id} rated as ${level}`);
    
    if (currentCardIndex < cards.length - 1) {
      const newIndex = currentCardIndex + 1;
      setCurrentCardIndex(newIndex);
      setIsFlipped(false);
      setProgress(((newIndex) / cards.length) * 100);
    } else {
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
  }

  if (sessionFinished) {
    return (
        <Card className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">{t('studySession.sessionComplete')}</h2>
            <p>{t('studySession.sessionCompleteMessage')}</p>
            <Button onClick={handleReset} className="mt-6">
                {t('studySession.startOver')}
            </Button>
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
                {/* Front of the card */}
                <Card className="absolute inset-0 w-full h-full flex flex-col justify-center items-center p-8 cursor-pointer select-none [backface-visibility:hidden]">
                    <p className="text-3xl font-semibold text-center">{card.question}</p>
                </Card>

                {/* Back of the card */}
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
