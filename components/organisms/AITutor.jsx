import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ICONS } from '../../constants';
import Button from '../atoms/Button';
import { getAIHelp } from '../../services/geminiService';
import Input from '../atoms/Input';

/**
 * An AI Tutor component that provides contextual help to the user.
 * It appears as a floating action button and opens a chat window.
 * @returns {React.ReactElement} The rendered AI Tutor component.
 */
const AITutor = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    if (isOpen) {
      const pageName = location.pathname.split('/').pop() || 'home';
      setMessages([{ sender: 'ai', text: t('aiTutor.greeting', { page: pageName }) }]);
    } else {
      setMessages([]);
      setCurrentMessage('');
    }
  }, [isOpen, location.pathname, t]);
  
  const handleSend = async () => {
    if (!currentMessage.trim()) return;

    const userMessage = { sender: 'user', text: currentMessage };
    setMessages(prev => [...prev, userMessage]);
    setCurrentMessage('');
    setIsLoading(true);

    try {
      const aiResponse = await getAIHelp(currentMessage, location.pathname);
      setMessages(prev => [...prev, { sender: 'ai', text: aiResponse }]);
    } catch (error) {
      setMessages(prev => [...prev, { sender: 'ai', text: t('aiTutor.error') }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 bg-accent text-white w-16 h-16 rounded-full shadow-lg flex items-center justify-center hover:bg-accent-600 transition-transform transform hover:scale-110 z-40"
        aria-label="Open AI Tutor"
      >
        {ICONS.aiTutor}
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 z-40" onClick={() => setIsOpen(false)}>
          <div
            onClick={e => e.stopPropagation()}
            className="fixed bottom-28 right-8 w-full max-w-sm h-auto max-h-[70vh] bg-light-bg-alt dark:bg-dark-bg-alt rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            <header className="p-4 bg-primary text-white text-lg font-bold text-center">
              {t('aiTutor.title')}
            </header>
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs px-4 py-2 rounded-lg ${msg.sender === 'user' ? 'bg-primary text-white' : 'bg-gray-200 dark:bg-gray-700'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && <div className="flex justify-start"><div className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700">{t('aiTutor.thinking')}</div></div>}
            </div>
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex gap-2">
              <Input 
                value={currentMessage} 
                onChange={e => setCurrentMessage(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && handleSend()}
                placeholder={t('aiTutor.placeholder')}
                className="flex-1"
                disabled={isLoading}
              />
              <Button onClick={handleSend} disabled={isLoading} variant="primary">{t('aiTutor.send')}</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AITutor;
