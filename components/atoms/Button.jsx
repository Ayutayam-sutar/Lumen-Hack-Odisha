import React from 'react';

/**
 * @typedef {Object} ButtonProps
 * @property {'primary' | 'secondary' | 'accent'} [variant='primary']
 * @property {React.ReactNode} children
 * @property {string} [className]
 */

/**
 * A customizable button component with different visual styles.
 * @param {ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>} props
 */
const Button = ({ variant = 'primary', children, className = '', ...props }) => {
  const baseClasses = 'px-4 py-2 rounded-lg font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-dark-bg transition-colors duration-200';

  const variantClasses = {
    primary: 'bg-primary text-white hover:bg-primary-700 focus:ring-primary',
    secondary: 'bg-gray-200 dark:bg-dark-bg-alt text-light-text dark:text-dark-text hover:bg-gray-300 dark:hover:bg-gray-600 focus:ring-primary-500',
    accent: 'bg-accent text-white hover:bg-accent-600 focus:ring-accent',
  };

  return (
    <button className={`${baseClasses} ${variantClasses[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
