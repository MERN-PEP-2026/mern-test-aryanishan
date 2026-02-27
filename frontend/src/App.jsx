import React, { useEffect, useMemo, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/auth/PrivateRoute';
import Navbar from './components/layout/Navbar';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import CreateCoursePage from './pages/CreateCoursePage';
import MyCoursesPage from './pages/MyCoursesPage';
import { ROUTES } from './utils/constants';
import './App.css';

function App() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toasterStyle = useMemo(
    () => ({
      background: theme === 'dark' ? '#1c2434' : '#ffffff',
      color: theme === 'dark' ? '#e7edf9' : '#132038',
      border: theme === 'dark' ? '1px solid #2d3a54' : '1px solid #d4deef'
    }),
    [theme]
  );

  const handleThemeToggle = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar theme={theme} onToggleTheme={handleThemeToggle} />
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: toasterStyle,
              success: {
                duration: 3000,
                iconTheme: {
                  primary: '#10b981',
                  secondary: '#fff',
                },
              },
              error: {
                duration: 4000,
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#fff',
                },
              },
            }}
          />
          <div className="container">
            <Routes>
              <Route path={ROUTES.HOME} element={<HomePage />} />
              <Route path={ROUTES.LOGIN} element={<Login />} />
              <Route path={ROUTES.REGISTER} element={<Register />} />
              <Route path={ROUTES.COURSES_CREATE} element={
                <PrivateRoute>
                  <CreateCoursePage />
                </PrivateRoute>
              } />
              <Route path={ROUTES.COURSES_MY} element={
                <PrivateRoute>
                  <MyCoursesPage />
                </PrivateRoute>
              } />
              <Route path={ROUTES.PROFILE} element={
                <PrivateRoute>
                  <ProfilePage />
                </PrivateRoute>
              } />
              <Route path={ROUTES.DASHBOARD} element={<Navigate to={ROUTES.COURSES_MY} replace />} />
              <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
