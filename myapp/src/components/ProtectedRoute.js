import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const isAuthenticated = localStorage.getItem('isAuthenticated'); // You can replace this with your own authentication logic (like checking tokens, etc.)

  if (!isAuthenticated) {
    // Redirect to the login page or verification page if not authenticated
    return <Navigate to="/verify" state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
