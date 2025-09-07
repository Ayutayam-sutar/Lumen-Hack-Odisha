import React, { createContext, useState, useCallback } from 'react';

/**
 * @typedef {Object} ToastMessage
 * @property {number} id
 * @property {string} message
 */

/**
 * @typedef {Object} ToastContextType
 * @property {ToastMessage[]} toasts
 * @property {(message: string) => void} addToast
 * @property {(id: number) => void} removeToast
 */

// A default value is provided to the context to ensure it's never undefined.
export const ToastContext = createContext({
  toasts: [],
  addToast: () => {},
  removeToast: () => {},
});

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  
  const addToast = useCallback((message) => {
    const id = Date.now();
    setToasts(currentToasts => [...currentToasts, { id, message }]);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(currentToasts => currentToasts.filter(toast => toast.id !== id));
  }, []);
  
  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
};
