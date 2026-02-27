import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ROUTES } from '../../utils/constants';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const nextErrors = {};
    if (!formData.name) {
      nextErrors.name = 'Name is required';
    } else if (formData.name.length < 2) {
      nextErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email) {
      nextErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      nextErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      nextErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      nextErrors.password = 'Password must be at least 6 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      nextErrors.confirmPassword = 'Passwords do not match';
    }
    return nextErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nextErrors = validateForm();
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    const { confirmPassword, ...registerData } = formData;
    const result = await register(registerData);
    if (result.success) {
      navigate(ROUTES.COURSES_MY);
    }
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-soft dark:bg-slate-900 sm:p-8">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">Create account</h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Start building your personal course library.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            ['name', 'Name', 'text', 'Enter your name'],
            ['email', 'Email', 'email', 'Enter your email'],
            ['password', 'Password', 'password', 'Enter your password'],
            ['confirmPassword', 'Confirm Password', 'password', 'Confirm your password']
          ].map(([name, label, type, placeholder]) => (
            <div key={name}>
              <label className="mb-1.5 block text-sm font-semibold text-slate-700 dark:text-slate-200">{label}</label>
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                placeholder={placeholder}
                className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              />
              {errors[name] ? <p className="mt-1 text-xs text-rose-500">{errors[name]}</p> : null}
            </div>
          ))}

          <button
            type="submit"
            className="w-full rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            Register
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-slate-500 dark:text-slate-400">
          Already have an account?{' '}
          <Link to={ROUTES.LOGIN} className="font-semibold text-indigo-600 hover:text-indigo-700">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
