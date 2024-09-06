// src/components/PublicRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PublicRoute = ({ children }) => {
  const { user } = useAuth();
  console.log('-->',user)

  return !user ? children : <Navigate to="/dashboard" />;
};

export default PublicRoute;
