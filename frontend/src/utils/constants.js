export const API_BASE_URL = 'http://localhost:5000/api';

export const ROUTES = {
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  HOME: '/'
};

export const COURSE_VALIDATION = {
  MIN_NAME_LENGTH: 3,
  MIN_DESCRIPTION_LENGTH: 10
};

export const TOAST_MESSAGES = {
  LOGIN_SUCCESS: 'Login successful!',
  LOGIN_ERROR: 'Login failed. Please check your credentials.',
  REGISTER_SUCCESS: 'Registration successful!',
  REGISTER_ERROR: 'Registration failed. Please try again.',
  COURSE_CREATED: 'Course created successfully!',
  COURSE_UPDATED: 'Course updated successfully!',
  COURSE_DELETED: 'Course deleted successfully!',
  COURSE_ERROR: 'Failed to process course. Please try again.'
};