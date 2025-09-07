import React from 'react';

/**
 * @typedef {object} Section
 * @property {string} id
 * @property {string} title
 */

/**
 * @typedef {object} ContentSidebarProps
 * @property {Section[]} sections
 * @property {string} activeSection
 * @property {(sectionId: string) => void} setActiveSection
 */

/**
 * A sidebar navigation component to switch between content sections.
 * @param {ContentSidebarProps} props
 */
const ContentSidebar = ({ sections, activeSection, setActiveSection }) => {
    
    const baseClasses = 'block w-full text-left px-4 py-2 rounded-md font-semibold transition-colors duration-200';
    const activeClasses = 'bg-primary-100 text-primary dark:bg-primary-900 dark:text-primary-100';
    const inactiveClasses = 'hover:bg-gray-100 dark:hover:bg-gray-800';

    return (
        <aside className="sticky top-28">
            <nav className="space-y-2">
                {sections.map(section => (
                    <button 
                        key={section.id} 
                        onClick={() => setActiveSection(section.id)}
                        className={`${baseClasses} ${activeSection === section.id ? activeClasses : inactiveClasses}`}
                    >
                        {section.title}
                    </button>
                ))}
            </nav>
        </aside>
    );
};

export default ContentSidebar;
