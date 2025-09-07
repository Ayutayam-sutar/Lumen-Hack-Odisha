import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { ICONS } from '../constants';

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-dark-bg p-4">
      <div className="w-full max-w-md">
        <Link to="/" className="flex justify-center items-center mb-8 gap-2">
          <img className="rounded-full h-11 w-11"src="pages\lumen lgo.png" alt="" />
          <h1 className="text-3xl font-bold text-light-text dark:text-dark-text">Lumen</h1>
        </Link>
        <div className="bg-light-bg-alt dark:bg-dark-bg-alt rounded-xl shadow-lg p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
