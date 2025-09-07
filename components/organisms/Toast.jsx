import React, { useEffect, useState } from 'react';

/**
 * @typedef {object} ToastProps
 * @property {string} message - The message to display in the toast.
 * @property {() => void} onDismiss - Callback function to dismiss the toast.
 */

/**
 * A temporary notification component that appears and fades out.
 * @param {ToastProps} props - The props for the Toast component.
 * @returns {React.ReactElement} The rendered toast component.
 */
const Toast = ({ message, onDismiss }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Animate in
    setIsVisible(true);
    // Set timer to animate out
    const timer = setTimeout(() => {
      setIsVisible(false);
      // Allow time for fade-out animation before removing from DOM
      setTimeout(onDismiss, 300);
    }, 2700);

    return () => clearTimeout(timer);
  }, [onDismiss]);

  return (
    <div
      className={`bg-primary text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all duration-300 ease-in-out transform ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      }`}
    >
      {message}
    </div>
  );
};

export default Toast;
