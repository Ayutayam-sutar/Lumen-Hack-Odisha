import React, { useState, useMemo, useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { mockMentors } from '../utils/mockData';
import { GamificationContext } from '../contexts/GamificationContext';
import Card from '../components/atoms/Card';
import Button from '../components/atoms/Button';
import Input from '../components/atoms/Input';

// --- Helper Icons (No external library needed) ---
const StarIcon = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>;
const RupeeIcon = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3h12M6 8h12M4 13h16M7 13c0 4.418 3.134 8 7 8s7-3.582 7-8"/></svg>;
const CloseIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>;

// --- Redesigned & Self-Contained Child Components ---

const ModeSelector = ({ mode, setMode }) => {
    const { t } = useTranslation();
    const baseClasses = "px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary";
    const activeClasses = "bg-primary text-white shadow-md";
    const inactiveClasses = "bg-light-bg-alt dark:bg-dark-bg-alt hover:bg-gray-200 dark:hover:bg-gray-700";

    return (
        <div className="flex items-center gap-2 p-1.5 bg-gray-200 dark:bg-dark-bg rounded-full">
            <button onClick={() => setMode('online')} className={`${baseClasses} ${mode === 'online' ? activeClasses : inactiveClasses}`}>{t('doubtSolver.online', 'Online')}</button>
            <button onClick={() => setMode('offline')} className={`${baseClasses} ${mode === 'offline' ? activeClasses : inactiveClasses}`}>{t('doubtSolver.offline', 'In-Person')}</button>
        </div>
    );
};

const MentorCard = ({ mentor, onSelect }) => {
    const { t } = useTranslation();
    return (
        <Card className="p-6 flex flex-col text-center items-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <img src={mentor.avatarUrl} alt={mentor.name} className="w-24 h-24 rounded-full mb-4 border-4 border-gray-200 dark:border-gray-700 shadow-md"/>
            <h3 className="text-xl font-bold">{mentor.name}</h3>
            <p className="text-primary font-semibold mb-3">{mentor.expertise}</p>
            <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                    <StarIcon className="w-5 h-5 text-yellow-400"/>
                    <span className="font-bold">{mentor.rating.toFixed(1)}</span>
                </div>
                <div className="flex items-center gap-1">
                    <span className="font-bold">₹{mentor.rate}hr</span>
                </div>
            </div>
            <Button variant="primary" className="w-full mt-auto hover:bg-gradient-to-r from-primary to-accent" onClick={() => onSelect(mentor)}>
                {t('doubtSolver.bookSession', 'Book Session')}
            </Button>
        </Card>
    );
};

const MentorList = ({ mentors, onSelectMentor }) => {
    if (mentors.length === 0) {
        return <div className="text-center py-12 text-light-text-muted dark:text-dark-text-muted">{("No mentors found matching your criteria.")}</div>;
    }
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {mentors.map(mentor => (
                <MentorCard key={mentor.id} mentor={mentor} onSelect={onSelectMentor} />
            ))}
        </div>
    );
};

const BookingModal = ({ isOpen, onClose, onConfirm, mentor }) => {
    const [selectedTime, setSelectedTime] = useState(null);

    // Reset state when modal opens for a new mentor
    useEffect(() => {
        if (isOpen) {
            setSelectedTime(null);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleConfirm = () => {
        if (selectedTime) {
            onConfirm({ mentorName: mentor.name, time: selectedTime });
        }
    };

    const baseSlotClasses = "px-3 py-2 text-sm font-semibold rounded-lg transition-all duration-200 border-2";
    const activeSlotClasses = "bg-primary text-white border-primary";
    const inactiveSlotClasses = "bg-transparent border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700";
    
    return (
      <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
        <div className="bg-light-bg-alt dark:bg-dark-bg-alt rounded-2xl shadow-2xl w-full max-w-md" onClick={e => e.stopPropagation()}>
          <div className="p-6 border-b border-light-border dark:border-dark-border">
            <h2 className="text-2xl font-bold">Book with {mentor.name}</h2>
            <p className="text-light-text-muted dark:text-dark-text-muted text-sm">Select a time slot to confirm your session.</p>
          </div>
          <div className="p-6">
            <h3 className="font-semibold mb-4">Available Slots:</h3>
            <div className="flex flex-wrap gap-3">
                {mentor.availableSlots && mentor.availableSlots.length > 0 ? (
                    mentor.availableSlots.map(slot => (
                        <button 
                            key={slot}
                            onClick={() => setSelectedTime(slot)}
                            className={`${baseSlotClasses} ${selectedTime === slot ? activeSlotClasses : inactiveSlotClasses}`}
                        >
                            {slot}
                        </button>
                    ))
                ) : (
                    <p className="text-sm text-light-text-muted dark:text-dark-text-muted">No available slots for this mentor.</p>
                )}
            </div>
          </div>
          <div className="flex justify-end gap-4 p-4 bg-gray-50 dark:bg-dark-bg/50 border-t border-light-border dark:border-dark-border rounded-b-2xl">
            <Button variant="secondary" onClick={onClose}>Cancel</Button>
            <Button variant="primary" onClick={handleConfirm} disabled={!selectedTime}>
                Confirm Booking
            </Button>
          </div>
        </div>
      </div>
    );
};
  
const ConfirmationDialog = ({ isOpen, onClose, bookingDetails }) => {
    if (!isOpen) return null;
    return (
      <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
        <div className="bg-light-bg-alt dark:bg-dark-bg-alt rounded-2xl shadow-2xl w-full max-w-md p-8 text-center" onClick={e => e.stopPropagation()}>
          <h2 className="text-2xl font-bold mb-4 text-green-500">Booking Confirmed!</h2>
          <p className="mb-2">Your session with <span className="font-semibold">{bookingDetails.mentorName}</span> is scheduled for:</p>
          <p className="text-lg font-bold text-primary mb-6">{bookingDetails.time}</p>
          <Button variant="primary" onClick={onClose}>Done</Button>
        </div>
      </div>
    );
};


const DoubtSolverPage = () => {
  const { t } = useTranslation();
  const [mode, setMode] = useState('online');
  const [filters, setFilters] = useState({ search: '', expertise: 'All' });
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);
  const gamification = useContext(GamificationContext);

  const uniqueExpertise = useMemo(() => ['All', ...new Set(mockMentors.map(m => m.expertise))], []);

  const filteredMentors = useMemo(() => {
    return mockMentors.filter(mentor => {
        const matchesMode = mentor.modes.includes(mode);
        const matchesSearch = mentor.name.toLowerCase().includes(filters.search.toLowerCase());
        const matchesExpertise = filters.expertise === 'All' || mentor.expertise === filters.expertise;
        return matchesMode && matchesSearch && matchesExpertise;
    });
  }, [mode, filters]);

  const handleSelectMentor = (mentor) => setSelectedMentor(mentor);
  const handleCloseModal = () => setSelectedMentor(null);

  const handleConfirmBooking = (details) => {
    setBookingDetails(details);
    setSelectedMentor(null);
    setShowConfirmation(true);
    if (gamification) {
        gamification.addXp(75);
    }
  };
  
  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
    setBookingDetails(null);
  };

  return (
    <div className="space-y-6 md:space-y-8">
        <div>
            <h1 className="text-2xl sm:text-3xl font-bold">{t('doubtSolver.welcome_heading', 'Find Your Expert Mentor')}</h1>
            <p className="text-md sm:text-lg text-light-text-muted dark:text-dark-text-muted">{t('doubtSolver.subtitle', 'Get one-on-one help from top mentors.')}</p>
        </div>

        {/* --- Filters & Controls Section --- */}
        <Card className="p-4 sm:p-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="w-full md:w-auto">
                    <ModeSelector mode={mode} setMode={setMode} />
                </div>
                <div className="w-full md:flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input 
                        placeholder={t('doubtSolver.searchPlaceholder', 'Search by name...')}
                        value={filters.search}
                        onChange={e => setFilters({...filters, search: e.target.value})}
                    />
                    <select
                        value={filters.expertise}
                        onChange={e => setFilters({...filters, expertise: e.target.value})}
                        className="w-full bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                        {uniqueExpertise.map(exp => <option key={exp} value={exp}>{exp}</option>)}
                    </select>
                </div>
            </div>
        </Card>
        
        <MentorList 
            mentors={filteredMentors} 
            onSelectMentor={handleSelectMentor} 
        />

        {selectedMentor && (
            <BookingModal 
                isOpen={!!selectedMentor} 
                onClose={handleCloseModal}
                onConfirm={handleConfirmBooking}
                mentor={selectedMentor}
            />
        )}

        {bookingDetails && (
            <ConfirmationDialog
                isOpen={showConfirmation}
                onClose={handleCloseConfirmation}
                bookingDetails={bookingDetails}
            />
        )}
    </div>
  );
};

export default DoubtSolverPage;

