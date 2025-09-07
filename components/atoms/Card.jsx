import React from 'react';

/**
 * @typedef {Object} CardProps
 * @property {React.ReactNode} children
 * @property {string} [className]
 */

/**
 * A container component with a consistent card-like appearance.
 * It accepts all standard div props like onClick.
 * @param {CardProps & React.HTMLAttributes<HTMLDivElement>} props
 */
const Card = ({ children, className = '', ...props }) => {
  return (
    <div className={`bg-light-bg-alt dark:bg-dark-bg-alt rounded-xl shadow-md overflow-hidden transition-all duration-300 ${className}`} {...props}>
      {children}
    </div>
  );
};

export default Card;
