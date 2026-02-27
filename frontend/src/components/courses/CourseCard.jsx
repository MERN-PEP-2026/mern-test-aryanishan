import React from 'react';
import { FiEdit2, FiTrash2, FiCalendar, FiUser } from 'react-icons/fi';
import './CourseCard.css';

const CourseCard = ({ course, onEdit, onDelete }) => {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="course-card">
      <div className="course-header">
        <h3 className="course-title">{course.courseName}</h3>
        <div className="course-actions">
          <button onClick={onEdit} className="action-btn edit-btn" title="Edit course">
            <FiEdit2 />
          </button>
          <button onClick={onDelete} className="action-btn delete-btn" title="Delete course">
            <FiTrash2 />
          </button>
        </div>
      </div>

      <div className="course-instructor">
        <FiUser className="icon" />
        <span>{course.instructor}</span>
      </div>

      <p className="course-description">{course.courseDescription}</p>

      <div className="course-footer">
        <div className="course-date">
          <FiCalendar className="icon" />
          <span>{formatDate(course.createdAt)}</span>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;