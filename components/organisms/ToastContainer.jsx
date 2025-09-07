import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import Toast from './Toast';
import { ToastContext } from '../../contexts/ToastContext';

/**
 * A container that renders toast notifications into a portal attached to the document body.
 * It retrieves toast messages from the ToastContext.
 * @returns {React.ReactPortal | null} The rendered portal with toasts, or null if there are no toasts.
 */
const ToastContainer = () => {
  const { toasts, removeToast } = useContext(ToastContext);
  const portalRoot = document.body;

  if (!toasts.length) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-3">
      {toasts.map((toast) => (
        <Toast key={toast.id} message={toast.message} onDismiss={() => removeToast(toast.id)} />
      ))}
    </div>,
    portalRoot
  );
};

export default ToastContainer;
