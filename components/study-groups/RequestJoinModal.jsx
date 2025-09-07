import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '../atoms/Button';
import { GamificationContext } from '../../contexts/GamificationContext';

/**
 * @typedef {import('../../types').StudyGroup} StudyGroup
 */

/**
 * @typedef {object} RequestJoinModalProps
 * @property {boolean} isOpen - Whether the modal is open.
 * @property {() => void} onClose - Function to close the modal.
 * @property {StudyGroup | null} group - The group to request to join.
 */

/**
 * A modal to confirm a user's request to join a study group.
 * @param {RequestJoinModalProps} props - The props for the component.
 * @returns {React.ReactElement | null} The rendered RequestJoinModal component or null.
 */
const RequestJoinModal = ({ isOpen, onClose, group }) => {
  const { t } = useTranslation();
  const gamification = useContext(GamificationContext);
  if (!isOpen || !group) return null;

  const handleSendRequest = () => {
    console.log(`Sending join request for group: ${group.name}`);
    // Here you would typically make an API call
    gamification.addXp(25);
    onClose(); // Close modal after sending request
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
        
        <p className="text-sm text-center my-6">{t('studyGroups.joinGroupInfo')}</p>

        <div className="flex justify-center gap-4 ">
          <Button variant="secondary" onClick={onClose}>{t('doubtSolver.cancel')}</Button>
          <Button className="hover:bg-gradient-to-r from-primary to-accent" variant="primary" onClick={handleSendRequest}>
            {t('studyGroups.sendRequest')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RequestJoinModal;
