import React, { createContext, useState, useContext } from 'react';
import { ToastContext } from './ToastContext';

/**
 * @typedef {Object} GamificationContextType
 * @property {(amount: number) => void} addXp
 */

export const GamificationContext = createContext({
  addXp: () => {},
});

export const GamificationProvider = ({ children }) => {
  const [xp, setXp] = useState(450); // From mockUser
  const [level, setLevel] = useState(7); // From mockUser
  const xpToNextLevel = 1000; // From mockUser
  
  const toastContext = useContext(ToastContext);

  const addXp = (amount) => {
    let newXp = xp + amount;
    let newLevel = level;

    if (newXp >= xpToNextLevel) {
      newLevel += 1;
      newXp -= xpToNextLevel;
      // In a real app, the next xpToNextLevel would likely increase.
      toastContext.addToast(`🎉 Level Up! You've reached Level ${newLevel}!`);
    } else {
        toastContext.addToast(`🎉 +${amount} XP Earned!`);
    }
    
    setXp(newXp);
    setLevel(newLevel);
  };
  
  return (
    <GamificationContext.Provider value={{ addXp }}>
      {children}
    </GamificationContext.Provider>
  );
};
