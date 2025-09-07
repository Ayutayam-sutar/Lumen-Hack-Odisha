import React from 'react';
import { useTranslation } from 'react-i18next';
import Button from '../atoms/Button';

/**
 * @typedef {Object} BookingDetails
 * @property {string} mentorName
 * @property {string} mode
 * @property {string} time
 * @property {string | null} [address]
 */

/**
 * @typedef {Object} ConfirmationDialogProps
 * @property {boolean} isOpen
 * @property {() => void} onClose
 * @property {BookingDetails} bookingDetails
 */

/**
 * A dialog to confirm that a booking has been successfully made.
 * @param {ConfirmationDialogProps} props
 */
const ConfirmationDialog = ({ isOpen, onClose, bookingDetails }) => {
  const { t } = useTranslation();
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div 
        className="bg-light-bg-alt dark:bg-dark-bg-alt rounded-2xl shadow-2xl w-full max-w-md text-center p-8"
        onClick={e => e.stopPropagation()}
      >
        <div className="text-6xl mb-4">✅</div>
        <h2 className="text-2xl font-bold mb-2">{t('doubtSolver.bookingConfirmedTitle')}</h2>
        <p className="text-light-text-muted dark:text-dark-text-muted mb-6">{t('doubtSolver.bookingConfirmedSubtitle', { name: bookingDetails.mentorName })}</p>
        
        <div className="text-left bg-gray-100 dark:bg-gray-800 p-4 rounded-lg space-y-2">
            <p><strong>{t('doubtSolver.mode')}</strong> <span className="capitalize">{bookingDetails.mode}</span></p>
            <p><strong>{t('doubtSolver.time')}</strong> {bookingDetails.time}</p>
            {bookingDetails.address && <p><strong>{t('doubtSolver.address')}</strong> {bookingDetails.address}</p>}
        </div>

        <Button variant="primary" onClick={onClose} className=" hover:bg-gradient-to-r from-primary to-accent w-full mt-6">
          {t('doubtSolver.great')}
        </Button>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
