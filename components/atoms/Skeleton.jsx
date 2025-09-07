import React from 'react';

/**
 * @typedef {Object} SkeletonProps
 * @property {string} [className]
 */

/**
 * A component to display a placeholder preview of content before it loads.
 * @param {SkeletonProps} props
 */
const Skeleton = ({ className = '' }) => {
  return (
    <div className={`bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse ${className}`} />
  );
};

export default Skeleton;
