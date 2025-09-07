import React from 'react';

/**
 * @typedef {Object} InputProps
 * @property {string} [label]
 * @property {string} [className]
 */

/**
 * A styled input component with an optional label.
 * It accepts all standard input element props.
 * @param {InputProps & React.InputHTMLAttributes<HTMLInputElement>} props
 */
const Input = ({ label, className = '', id, ...props }) => {
  return (
    <div>
      {label && <label htmlFor={id} className="block text-sm font-medium text-light-text-muted dark:text-dark-text-muted mb-1">{label}</label>}
      <input
        id={id}
        className={`w-full px-3 py-2 bg-gray-50 dark:bg-dark-bg border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:focus:border-primary-500 transition-colors duration-200 ${className}`}
        {...props}
      />
    </div>
  );
};

export default Input;
