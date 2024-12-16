import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import HomePage from '../pages/HomePage';
import ProfilePage from '../pages/ProfilePage';
import Chat from '../pages/chat/Chat';
import ChatLayout from '../components/layout/ChatLayout';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route
        path="/chat"
        element={
          <ChatLayout>
            <Chat />
          </ChatLayout>
        }
      />
    </Routes>
  );
};

export default AppRoutes;