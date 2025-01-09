import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import VerificationPage from './pages/VerificationPage';
import Category from './components/Category';
import AccountDetails from './components/AccountDetails';
import ProtectedRoute from './components/ProtectedRoute'; // Import the ProtectedRoute component

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/verify' element={<VerificationPage />} />
        <Route path='/category' element={<Category />} />
        <Route path="/account-details" element={<AccountDetails />} />

        {/* Use ProtectedRoute for account details */}
        <Route
          path='/account-details'
          element={
            <ProtectedRoute>
             <Route path="/account-details" element={<AccountDetails />} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
