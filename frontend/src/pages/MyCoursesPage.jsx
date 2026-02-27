import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import CourseCard from '../components/courses/CourseCard';
import EditCourseModal from '../components/courses/EditCourseModal';
import api from '../services/api';
import { TOAST_MESSAGES } from '../utils/constants';
import './MyCoursesPage.css';

const MyCoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingCourse, setEditingCourse] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await api.get('/courses');
        setCourses(res.data.data);
      } catch (error) {
        toast.error(error.response?.data?.message || TOAST_MESSAGES.COURSE_ERROR);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const updateCourse = async (id, courseData) => {
    try {
      const res = await api.put(`/courses/${id}`, courseData);
      setCourses((prevCourses) =>
        prevCourses.map((course) => (course._id === id ? res.data.data : course))
      );
      setEditingCourse(null);
      toast.success(TOAST_MESSAGES.COURSE_UPDATED);
    } catch (error) {
      toast.error(error.response?.data?.message || TOAST_MESSAGES.COURSE_ERROR);
    }
  };

  const deleteCourse = async (id) => {
    if (!window.confirm('Are you sure you want to delete this course?')) return;

    try {
      await api.delete(`/courses/${id}`);
      setCourses((prevCourses) => prevCourses.filter((course) => course._id !== id));
      toast.success(TOAST_MESSAGES.COURSE_DELETED);
    } catch (error) {
      toast.error(error.response?.data?.message || TOAST_MESSAGES.COURSE_ERROR);
    }
  };

  if (loading) {
    return <div className="loading-spinner"></div>;
  }

  return (
    <div className="my-courses-page">
      <div className="my-courses-header">
        <h1>My Created Courses</h1>
        <p>Total: {courses.length}</p>
      </div>

      {courses.length === 0 ? (
        <div className="my-courses-empty">
          <p>You have not created courses yet.</p>
        </div>
      ) : (
        <div className="my-courses-grid">
          {courses.map((course) => (
            <CourseCard
              key={course._id}
              course={course}
              onEdit={() => setEditingCourse(course)}
              onDelete={() => deleteCourse(course._id)}
            />
          ))}
        </div>
      )}

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

export default MyCoursesPage;
