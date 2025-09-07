import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '../atoms/Button';
import { GamificationContext } from '../../contexts/GamificationContext';
import { AuthContext } from '../../contexts/AuthContext'; // 1. Import AuthContext
import apiClient from '../../services/apiClient';

const RequestJoinModal = ({ isOpen, onClose, group, onJoinSuccess }) => {
    const { t } = useTranslation();
    const gamification = useContext(GamificationContext);
    const { loadUser } = useContext(AuthContext); // 2. Get loadUser from context
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    if (!isOpen || !group) return null;

    const handleSendRequest = async () => {
        setIsLoading(true);
        setError('');
        try {
            const response = await apiClient.put(`/groups/${group._id}/join`);
            onJoinSuccess(response.data);
            gamification.addXp(25);
            await loadUser(); // 3. Refresh user data after earning XP
            onClose();
        } catch (err) {
            setError(err.response?.data?.msg || 'An unexpected error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div 
                className="bg-light-bg-alt dark:bg-dark-bg-alt rounded-2xl shadow-2xl w-full max-w-md transform transition-all p-6"
                onClick={e => e.stopPropagation()}
            >
                <h2 className="text-2xl font-bold text-center">{t('studyGroups.joinGroupTitle')}</h2>
                <p className="text-center text-light-text-muted dark:text-dark-text-muted mb-6">{t('studyGroups.joinGroupSubtitle')}</p>

                <div className="bg-gray-100 dark:bg-dark-bg p-4 rounded-lg text-center">
                    <h3 className="text-xl font-bold text-primary">{group.name}</h3>
                    <p className="font-semibold">{group.subject}</p>
                </div>
                
                {/* 7. Display the error message if there is one */}
                {error && <p className="text-sm text-center my-4 text-red-500">{error}</p>}
                
                {!error && <p className="text-sm text-center my-6">{t('studyGroups.joinGroupInfo')}</p>}

                <div className="flex justify-center gap-4">
                    <Button variant="secondary" onClick={onClose} disabled={isLoading}>{t('doubtSolver.cancel')}</Button>
                    <Button variant="primary" onClick={handleSendRequest} disabled={isLoading}>
                        {isLoading ? t('common.sending', 'Sending...') : t('studyGroups.sendRequest')}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default RequestJoinModal;