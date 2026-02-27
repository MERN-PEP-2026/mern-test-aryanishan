import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FiLogOut, FiUser, FiBook, FiMoon, FiSun, FiPlusCircle, FiLayers, FiHome, FiMenu, FiX } from 'react-icons/fi';
import { ROUTES } from '../../utils/constants';

const Navbar = ({ theme, onToggleTheme }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate(ROUTES.LOGIN);
  };

  const handleCloseMenu = () => setIsOpen(false);

  const linkClass =
    'inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white';

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200/80 bg-white/95 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/95">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link to={ROUTES.HOME} onClick={handleCloseMenu} className="inline-flex items-center gap-2">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-300">
            <FiBook />
          </span>
          <div>
            <p className="text-base font-extrabold text-slate-900 dark:text-white">CourseFlow</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Student Course Management</p>
          </div>
        </Link>

        <div className="hidden items-center gap-2 md:flex">
          <Link to={ROUTES.HOME} className={linkClass}>
            <FiHome />
            Home
          </Link>
          {user ? (
            <>
              <Link to={ROUTES.COURSES_CREATE} className={linkClass}>
                <FiPlusCircle />
                Create
              </Link>
              <Link to={ROUTES.COURSES_MY} className={linkClass}>
                <FiLayers />
                My Courses
              </Link>
              <Link to={ROUTES.PROFILE} className={linkClass}>
                <FiUser />
                Profile
              </Link>
            </>
          ) : null}
          <button
            onClick={onToggleTheme}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <FiSun /> : <FiMoon />}
          </button>
          {user ? (
            <>
              <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">
                {user.name}
              </div>
              <button onClick={handleLogout} className={linkClass}>
                <FiLogOut />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to={ROUTES.LOGIN} className={linkClass}>
                Login
              </Link>
              <Link
                to={ROUTES.REGISTER}
                className="inline-flex items-center rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
              >
                Register
              </Link>
            </>
          )}
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={onToggleTheme}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 dark:border-slate-700 dark:text-slate-300"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <FiSun /> : <FiMoon />}
          </button>
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-700 dark:border-slate-700 dark:text-slate-200"
            aria-label="Toggle menu"
          >
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {isOpen ? (
        <div className="border-t border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-900 md:hidden">
          <div className="flex flex-col gap-2">
            <Link to={ROUTES.HOME} onClick={handleCloseMenu} className={linkClass}>
              <FiHome />
              Home
            </Link>
            {user ? (
              <>
                <Link to={ROUTES.COURSES_CREATE} onClick={handleCloseMenu} className={linkClass}>
                  <FiPlusCircle />
                  Create
                </Link>
                <Link to={ROUTES.COURSES_MY} onClick={handleCloseMenu} className={linkClass}>
                  <FiLayers />
                  My Courses
                </Link>
                <Link to={ROUTES.PROFILE} onClick={handleCloseMenu} className={linkClass}>
                  <FiUser />
                  Profile
                </Link>
                <button onClick={handleLogout} className={linkClass}>
                  <FiLogOut />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to={ROUTES.LOGIN} onClick={handleCloseMenu} className={linkClass}>
                  Login
                </Link>
                <Link
                  to={ROUTES.REGISTER}
                  onClick={handleCloseMenu}
                  className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      ) : null}
    </header>
  );
};

export default Navbar;
