import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { GamificationProvider } from './contexts/GamificationContext';
import { ToastProvider } from './contexts/ToastContext';
import { AchievementProvider } from './contexts/AchievementContext';
import './i18n'; // Initialize i18next

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <Suspense fallback="Loading...">
      <HashRouter>
        <ThemeProvider>
          <AuthProvider>
            <ToastProvider>
              <GamificationProvider>
                <AchievementProvider>
                  <App />
                </AchievementProvider>
              </GamificationProvider>
            </ToastProvider>
          </AuthProvider>
        </ThemeProvider>
      </HashRouter>
    </Suspense>
  </React.StrictMode>
);
