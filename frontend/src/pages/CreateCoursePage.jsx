import React from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import CourseForm from '../components/courses/CourseForm';
import api from '../services/api';
import { ROUTES, TOAST_MESSAGES } from '../utils/constants';
import './CreateCoursePage.css';

const CreateCoursePage = () => {
  const createCourse = async (courseData) => {
    try {
      await api.post('/courses', courseData);
      toast.success(TOAST_MESSAGES.COURSE_CREATED);
    } catch (error) {
      toast.error(error.response?.data?.message || TOAST_MESSAGES.COURSE_ERROR);
    }
  };

  return (
    <div className="create-course-page">
      <div className="page-header-row">
        <div>
          <h1>Create a New Course</h1>
          <p>Add course details and build your learning catalog.</p>
        </div>
        <Link to={ROUTES.COURSES_MY} className="btn btn-secondary">
          View My Courses
        </Link>
      </div>
      <div className="create-course-panel">
        <CourseForm onSubmit={createCourse} />
      </div>
    </div>
  );
};

export default CreateCoursePage;
