import React from 'react';

export const ICONS = {
  logo: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 20.5c.5-.5.8-1.2.8-2s-.3-1.5-.8-2c-.5-.5-1.2-.8-2-.8s-1.5.3-2 .8c-.5.5-.8 1.2-.8 2s.3 1.5.8 2c.5.5 1.2.8 2 .8s1.5-.3 2-.8Z"/><path d="M16.5 15c.5-.5.8-1.2.8-2s-.3-1.5-.8-2c-.5-.5-1.2-.8-2-.8s-1.5.3-2 .8c-.5.5-.8 1.2-.8 2s.3 1.5.8 2c.5.5 1.2.8 2 .8s1.5-.3 2-.8Z"/><path d="M16.5 9c.5-.5.8-1.2.8-2s-.3-1.5-.8-2c-.5-.5-1.2-.8-2-.8s-1.5.3-2 .8c-.5.5-.8 1.2-.8 2s.3 1.5.8 2c.5.5 1.2.8 2 .8s1.5-.3 2-.8Z"/><path d="M10 7.5c.5-.5.8-1.2.8-2s-.3-1.5-.8-2c-.5-.5-1.2-.8-2-.8s-1.5.3-2 .8c-.5.5-.8 1.2-.8 2s.3 1.5.8 2c.5.5 1.2.8 2 .8s1.5-.3 2-.8Z"/><path d="M14.5 11c.5-.5.8-1.2.8-2s-.3-1.5-.8-2c-.5-.5-1.2-.8-2-.8s-1.5.3-2 .8c-.5.5-.8 1.2-.8 2s.3 1.5.8 2c.5.5 1.2.8 2 .8s1.5-.3 2-.8Z"/><path d="M9.5 17c.5-.5.8-1.2.8-2s-.3-1.5-.8-2c-.5-.5-1.2-.8-2-.8s-1.5.3-2 .8c-.5.5-.8 1.2-.8 2s.3 1.5.8 2c.5.5 1.2.8 2 .8s1.5-.3 2-.8Z"/>
    </svg>
  ),
  dashboard: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>,
  groups: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  decks: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>,
  solve: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9.06 9.9 4.95 4.95"/><path d="m14.01 9.9-4.95 4.95"/></svg>,
  profile: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  leaderboard: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 3.45V22"/><path d="M14 12.55V22"/><path d="M8 18h1.5a2.5 2.5 0 0 0 0-5H8"/><path d="M14.5 18H16a2.5 2.5 0 0 0 0-5h-1.5"/></svg>,
  learnAi: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5C17.7 10.3 18 9 18 7.5c0-2.2-1.8-4-4-4.5-2.2-.5-4.2 1.3-4.5 3.5-1.5 1.5-2.5 3.3-3 5.5"/><path d="M14.5 18.5c-1.5 0-2.5-1-2.5-2.5s1-2.5 2.5-2.5s2.5 1 2.5 2.5s-1 2.5-2.5-2.5Z"/><path d="M9.5 22c-1.5 0-2.5-1-2.5-2.5s1-2.5 2.5-2.5s2.5 1 2.5 2.5s-1 2.5-2.5-2.5Z"/></svg>,
  machineLearning: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 18h.01"/><path d="M12 12h.01"/><path d="M6 6h.01"/><path d="M18 18h.01"/><path d="M18 6h.01"/><path d="M12 18h.01"/><path d="M12 6h.01"/><path d="M11 12a1 1 0 1 0 2 0a1 1 0 1 0-2 0"/><path d="M6 12a1 1 0 1 0 2 0a1 1 0 1 0-2 0"/><path d="M18 12a1 1 0 1 0 2 0a1 1 0 1 0-2 0"/></svg>,
  cybersecurity: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  search: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>,
  sun: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>,
  moon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>,
  aiTutor: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>,
  logout: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>,
};

export const NAV_LINKS = [
  { name: 'Dashboard', href: '/app/dashboard', icon: ICONS.dashboard },
  { name: 'Study Groups', href: '/app/groups', icon: ICONS.groups },
  { name: 'Flashcard Decks', href: '/app/decks', icon: ICONS.decks },
  { name: 'Doubt Solver', href: '/app/solve', icon: ICONS.solve },
  { name: 'Leaderboard', href: '/app/leaderboard', icon: ICONS.leaderboard },
  { name: 'AI Learning Hub', href: '/app/learn-ai', icon: ICONS.learnAi },
  { name: 'Profile', href: '/app/profile', icon: ICONS.profile },
];
