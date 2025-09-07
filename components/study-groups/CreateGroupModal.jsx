import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '../atoms/Button';
import Input from '../atoms/Input';
import { generateStudyGroupDetails } from '../../services/geminiService';

/**
 * @typedef {object} CreateGroupModalProps
 * @property {boolean} isOpen - Whether the modal is open.
 * @property {() => void} onClose - Function to close the modal.
 * @property {(groupDetails: object) => void} onCreateGroup - Function to pass the new group data back to the parent.
 */
const CreateGroupModal = ({ isOpen, onClose, onCreateGroup }) => {
    const { t } = useTranslation();
    const [subject, setSubject] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [generatedDetails, setGeneratedDetails] = useState(null);

    // Close modal on 'Escape' key press
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                handleClose();
            }
        };
        if (isOpen) {
            window.addEventListener('keydown', handleKeyDown);
        }
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]); // Added onClose to dependency array for correctness


    if (!isOpen) return null;

    const handleGenerate = async () => {
        if (!subject.trim()) return;
        setIsLoading(true);
        setError('');
        setGeneratedDetails(null);
        try {
            const details = await generateStudyGroupDetails(subject);
            setGeneratedDetails(details);
        } catch (error) {
            console.error(error);
            setError(t('studyGroups.errorGenerating', 'Failed to generate details. Please try again.'));
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreateGroup = () => {
        if (generatedDetails) {
            // FIX: Check if onCreateGroup is a function before calling it.
            if (typeof onCreateGroup === 'function') {
                onCreateGroup({ ...generatedDetails, subject: subject });
            } else {
                console.warn("onCreateGroup prop is not a function. The new group was not passed to the parent.");
            }
        }
        handleClose();
    };

    const handleClose = () => {
        setSubject('');
        setGeneratedDetails(null);
        setIsLoading(false);
        setError('');
        onClose();
    };

    const LoadingSpinner = () => (
        <div className="flex flex-col items-center justify-center space-y-3 p-4">
            <svg className="animate-spin h-8 w-8 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="text-light-text-muted dark:text-dark-text-muted animate-pulse">{t('studyGroups.generating', 'Brewing up some ideas...')}</p>
        </div>
    );

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4 transition-opacity duration-300" onClick={handleClose}>
            <div
                className="bg-light-bg-alt dark:bg-dark-bg-alt rounded-2xl shadow-2xl w-full max-w-lg transform transition-all duration-300 scale-95 opacity-0 animate-scale-in"
                onClick={e => e.stopPropagation()}
            >
                <div className="p-6 flex justify-between items-center border-b border-light-border dark:border-dark-border">
                    <div>
                        <h2 className="text-2xl font-bold">{t('studyGroups.createGroupTitle', 'Create a New Group with AI')}</h2>
                        <p className="text-light-text-muted dark:text-dark-text-muted text-sm">{t('studyGroups.createGroupSubtitle', 'Let AI kickstart your group details.')}</p>
                    </div>
                    <button onClick={handleClose} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                </div>

                <div className="p-6 space-y-4">
                    {!generatedDetails && !isLoading && (
                        <Input
                            label={t('studyGroups.subjectLabel', 'What subject are you studying?')}
                            id="subject"
                            placeholder={t('studyGroups.subjectPlaceholder', 'e.g., Quantum Physics, React Hooks...')}
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            disabled={isLoading}
                        />
                    )}
                    {isLoading && <LoadingSpinner />}
                    {error && <p className="text-red-500 text-sm text-center bg-red-500/10 p-3 rounded-lg">{error}</p>}

                    {generatedDetails && (
                        <div className="space-y-4 animate-fade-in">
                            <h3 className="font-semibold text-center text-primary dark:text-primary-300">{t('studyGroups.aiSuggestions', "Here's what we came up with!")}</h3>
                            <Input
                                label={t('studyGroups.groupName', 'Group Name')}
                                id="groupName"
                                value={generatedDetails.name}
                                onChange={(e) => setGeneratedDetails({ ...generatedDetails, name: e.target.value })}
                            />
                            <div>
                                <label htmlFor="groupDescription" className="block text-sm font-medium text-light-text dark:text-dark-text mb-1">{t('studyGroups.groupDescription', 'Description')}</label>
                                <textarea
                                    id="groupDescription"
                                    rows={3}
                                    value={generatedDetails.description}
                                    onChange={(e) => setGeneratedDetails({ ...generatedDetails, description: e.target.value })}
                                    className="w-full bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                            </div>
                            <Input
                                label={t('studyGroups.groupTags', 'Tags (comma-separated)')}
                                id="groupTags"
                                value={generatedDetails.tags.join(', ')}
                                onChange={(e) => setGeneratedDetails({ ...generatedDetails, tags: e.target.value.split(',').map(t => t.trim()) })}
                            />
                        </div>
                    )}
                </div>

                <div className="p-4 bg-gray-50 dark:bg-dark-bg/50 flex flex-col-reverse sm:flex-row justify-end gap-3 border-t border-light-border dark:border-dark-border">
                    <Button variant="secondary" onClick={handleClose} className="w-full sm:w-auto">{t('common.cancel', 'Cancel')}</Button>
                    {!generatedDetails ? (
                        <Button variant="primary" onClick={handleGenerate} disabled={isLoading || !subject.trim()} className="hover:bg-gradient-to-r from-primary to-accent w-full sm:w-auto">
                            {t('studyGroups.generateDetails', '✨ Generate Details')}
                        </Button>
                    ) : (
                        <div className="flex flex-col-reverse sm:flex-row gap-3 w-full sm:w-auto">
                            <Button variant="secondary" onClick={handleGenerate} disabled={isLoading} className=" hover:bg-gradient-to-r from-primary to-accent w-full sm:w-auto">{t('studyGroups.regenerate', 'Regenerate')}</Button>
                            <Button variant="accent" onClick={handleCreateGroup} className="hover:bg-gradient-to-r from-primary to-accent w-full sm:w-auto">
                                {t('studyGroups.createGroup', 'Create Group')}
                            </Button>
                        </div>
                    )}
                </div>
            </div>
            {/* Simple CSS animation keyframes */}
            <style>{`
                @keyframes scaleIn {
                    from { transform: scale(0.95); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
                .animate-scale-in { animation: scaleIn 0.2s ease-out forwards; }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                .animate-fade-in { animation: fadeIn 0.3s ease-in-out forwards; }
            `}</style>
        </div>
    );
};

export default CreateGroupModal;

