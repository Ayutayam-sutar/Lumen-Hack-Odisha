import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '../atoms/Button';
import Input from '../atoms/Input';

/**
 * @typedef {import('../../types').Mentor} Mentor
 */

/**
 * @typedef {Object} BookingModalProps
 * @property {boolean} isOpen
 * @property {() => void} onClose
 * @property {(details: object) => void} onConfirm
 * @property {Mentor} mentor
 * @property {'online' | 'offline'} mode
 */

/**
 * A modal for booking a session with a mentor.
 * @param {BookingModalProps} props
 */
const BookingModal = ({ isOpen, onClose, onConfirm, mentor, mode }) => {
  const { t } = useTranslation();
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [address, setAddress] = useState('');

  if (!isOpen) return null;
  
  const isConfirmDisabled = !selectedSlot || (mode === 'offline' && !address.trim());

  const handleConfirm = () => {
    onConfirm({
        mentorName: mentor.name,
        mode,
        time: selectedSlot,
        address: mode === 'offline' ? address : null,
    });
    // Reset state for next time
    setSelectedSlot(null);
    setAddress('');
  };

  const baseSlotClasses = 'px-4 py-2 rounded-lg font-semibold border-2 transition-colors duration-200';
  const activeSlotClasses = 'bg-primary text-white border-primary';
  const inactiveSlotClasses = 'bg-transparent border-gray-300 dark:border-gray-600 hover:border-primary hover:text-primary';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div 
        className="bg-light-bg-alt dark:bg-dark-bg-alt rounded-2xl shadow-2xl w-full max-w-lg transform transition-all"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold">{t('doubtSolver.bookingModalTitle', { name: mentor.name })}</h2>
          <p className="text-primary font-semibold">{mentor.expertise}</p>
        </div>
        
        <div className="p-6 space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-3">{t('doubtSolver.selectTime')}</h3>
            <div className="flex flex-wrap gap-3">
              {mentor.availableSlots.map(slot => (
                <button 
                    key={slot} 
                    onClick={() => setSelectedSlot(slot)}
                    className={`${baseSlotClasses} ${selectedSlot === slot ? activeSlotClasses : inactiveSlotClasses}`}
                >
                    {slot}
                </button>
              ))}
            </div>
          </div>

          {mode === 'offline' && (
            <div>
              <Input 
                label={t('doubtSolver.yourAddress')}
                id="address"
                placeholder={t('doubtSolver.addressPlaceholder')}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
          )}

          <div className="p-4 bg-primary-50 dark:bg-primary-900/50 rounded-lg text-center">
            <span className="text-lg font-bold">{t('doubtSolver.totalCost', { rate: mentor.rate })}</span>
          </div>
        </div>

        <div className="p-4 bg-gray-50 dark:bg-dark-bg flex justify-end gap-4 border-t border-gray-200 dark:border-gray-700">
          <Button variant="secondary" onClick={onClose}>{t('doubtSolver.cancel')}</Button>
          <Button variant="primary" onClick={handleConfirm} disabled={isConfirmDisabled}>
            {t('doubtSolver.confirmAndPay')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
