import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FiLogOut, FiUser, FiBook, FiMoon, FiSun, FiPlusCircle, FiLayers, FiHome } from 'react-icons/fi';
import { ROUTES } from '../../utils/constants';
import './Navbar.css';

const Navbar = ({ theme, onToggleTheme }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate(ROUTES.LOGIN);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to={ROUTES.HOME} className="nav-logo">
          <FiBook className="logo-icon" />
          <span>CourseManager</span>
        </Link>

        <div className="nav-menu">
          <Link to={ROUTES.HOME} className="nav-link">
            <FiHome />
            <span>Home</span>
          </Link>
          <button
            onClick={onToggleTheme}
            className="theme-toggle"
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <FiSun /> : <FiMoon />}
          </button>
          {user ? (
            <>
              <Link to={ROUTES.COURSES_CREATE} className="nav-link">
                <FiPlusCircle />
                <span>Create</span>
              </Link>
              <Link to={ROUTES.COURSES_MY} className="nav-link">
                <FiLayers />
                <span>My Courses</span>
              </Link>
              <Link to={ROUTES.PROFILE} className="nav-link">
                <FiUser />
                <span>Profile</span>
              </Link>
              <div className="nav-user">
                <FiUser className="user-icon" />
                <span>{user.name}</span>
              </div>
              <button onClick={handleLogout} className="nav-link btn-link">
                <FiLogOut />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link to={ROUTES.LOGIN} className="nav-link">Login</Link>
              <Link to={ROUTES.REGISTER} className="nav-link btn-register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
