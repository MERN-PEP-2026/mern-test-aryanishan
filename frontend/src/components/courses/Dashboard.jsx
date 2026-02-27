import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import CourseForm from './CourseForm';
import CourseCard from './CourseCard';
import EditCourseModal from './EditCourseModal';
import toast from 'react-hot-toast';
import api from '../../services/api';
import { TOAST_MESSAGES } from '../../utils/constants';
import './Dashboard.css';

const Dashboard = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingCourse, setEditingCourse] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await api.get('/courses');
      setCourses(res.data.data);
    } catch (err) {
      toast.error('Failed to fetch courses');
    } finally {
      setLoading(false);
    }
  };

  const createCourse = async (courseData) => {
    try {
      const res = await api.post('/courses', courseData);
      setCourses((prevCourses) => [res.data.data, ...prevCourses]);
      toast.success(TOAST_MESSAGES.COURSE_CREATED);
    } catch (err) {
      toast.error(err.response?.data?.message || TOAST_MESSAGES.COURSE_ERROR);
    }
  };

  const updateCourse = async (id, courseData) => {
    try {
      const res = await api.put(`/courses/${id}`, courseData);
      setCourses((prevCourses) =>
        prevCourses.map((course) => (course._id === id ? res.data.data : course))
      );
      setEditingCourse(null);
      toast.success(TOAST_MESSAGES.COURSE_UPDATED);
    } catch (err) {
      toast.error(err.response?.data?.message || TOAST_MESSAGES.COURSE_ERROR);
    }
  };

  const deleteCourse = async (id) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        await api.delete(`/courses/${id}`);
        setCourses((prevCourses) => prevCourses.filter((course) => course._id !== id));
        toast.success(TOAST_MESSAGES.COURSE_DELETED);
      } catch (err) {
        toast.error(err.response?.data?.message || TOAST_MESSAGES.COURSE_ERROR);
      }
    }
  };

  if (loading) {
    return <div className="loading-spinner"></div>;
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Welcome, {user?.name}!</h1>
        <p>Manage your courses</p>
      </div>

      <div className="dashboard-content">
        <div className="create-course-section">
          <h2>Create New Course</h2>
          <CourseForm onSubmit={createCourse} />
        </div>

        <div className="courses-section">
          <h2>Your Courses ({courses.length})</h2>
          {courses.length === 0 ? (
            <div className="no-courses">
              <p>You haven't created any courses yet.</p>
              <p>Use the form above to create your first course!</p>
            </div>
          ) : (
            <div className="courses-grid">
              {courses.map(course => (
                <CourseCard
                  key={course._id}
                  course={course}
                  onEdit={() => setEditingCourse(course)}
                  onDelete={() => deleteCourse(course._id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {editingCourse && (
        <EditCourseModal
          course={editingCourse}
          onClose={() => setEditingCourse(null)}
          onUpdate={updateCourse}
        />
      )}
    </div>
  );
};

export default Dashboard;
