import React, { useContext } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';
import { ICONS } from '../../constants';

/**
 * A button component that toggles the application's theme (light/dark).
 * It relies on the ThemeContext to get the current theme state and the toggle function.
 * @returns {React.ReactElement} The rendered theme toggle button.
 */
const ThemeToggleButton = () => {
    const themeContext = useContext(ThemeContext);
    if (!themeContext) {
        throw new Error('ThemeToggleButton must be used within a ThemeProvider');
    }
    const { isDarkMode, toggleTheme } = themeContext;

    return (
        <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700" aria-label="Toggle theme">
          {isDarkMode ? ICONS.sun : ICONS.moon}
        </button>
    );
};

export default ThemeToggleButton;
