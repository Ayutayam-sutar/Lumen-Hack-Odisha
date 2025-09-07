import React, { useState, useContext, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/organisms/Sidebar';
import Header from '../components/organisms/Header';
import GlobalSearch from '../components/molecules/GlobalSearch';
import AITutor from '../components/organisms/AITutor';
import ToastContainer from '../components/organisms/ToastContainer';
import { AuthContext } from '../contexts/AuthContext';
import { AchievementContext } from '../contexts/AchievementContext';

const AppLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const authContext = useContext(AuthContext);
  const achievementContext = useContext(AchievementContext);

  if (!authContext || !achievementContext) {
    throw new Error('AppLayout requires Auth and Achievement providers');
  }

  const { studyStreak } = authContext;
  const { logAction } = achievementContext;

  // Check for streak achievement whenever the streak value changes
  useEffect(() => {
    if (studyStreak > 0) {
      logAction('streakUpdated', { streak: studyStreak });
    }
  }, [studyStreak, logAction]);


  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  return (
    <div className="flex h-screen bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text overflow-hidden">
      <Sidebar isSidebarOpen={isSidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header toggleSidebar={toggleSidebar} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-8">
          <Outlet />
        </main>
      </div>
      <GlobalSearch />
      <AITutor />
      <ToastContainer />
    </div>
  );
};

export default AppLayout;
