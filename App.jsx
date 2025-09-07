import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
// The import path for AuthContext was incorrect (`./contexts/AuthContext`), causing the type to be inferred as `unknown`.
// Correcting the path resolves the property access error.
import { AuthContext } from './contexts/AuthContext';

// The import paths for page components were also incorrect and have been updated.
import LandingPage from './pages/LandingPage';
import AuthLayout from './pages/AuthLayout';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import AppLayout from './pages/AppLayout';
import DashboardPage from './pages/DashboardPage';
import StudyGroupMatcherPage from './pages/StudyGroupMatcherPage';
import FlashcardForgePage from './pages/FlashcardForgePage';
import StudySessionPage from './pages/StudySessionPage';
import DoubtSolverPage from './pages/DoubtSolverPage';
import ProfilePage from './pages/ProfilePage';
import LearnAiPage from './pages/LearnAiPage';
import LeaderboardPage from './pages/LeaderboardPage';

const ProtectedRoute = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('AuthContext must be used within an AuthProvider');
  }

  return authContext.isAuthenticated ? <AppLayout /> : <Navigate to="/" replace />;
};

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth" element={<AuthLayout />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignUpPage />} />
      </Route>
      <Route path="/app" element={<ProtectedRoute />}>
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="groups" element={<StudyGroupMatcherPage />} />
        <Route path="decks" element={<FlashcardForgePage />} />
        <Route path="decks/:deckId" element={<StudySessionPage />} />
        <Route path="solve" element={<DoubtSolverPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="learn-ai" element={<LearnAiPage />} />
        <Route path="leaderboard" element={<LeaderboardPage />} />
        <Route index element={<Navigate to="dashboard" replace />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
