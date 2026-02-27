import React, { useState } from 'react';
import { FiX } from 'react-icons/fi';
import './EditCourseModal.css';

const EditCourseModal = ({ course, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    courseName: course.courseName,
    courseDescription: course.courseDescription,
    instructor: course.instructor
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.courseName) {
      newErrors.courseName = 'Course name is required';
    } else if (formData.courseName.length < 3) {
      newErrors.courseName = 'Course name must be at least 3 characters';
    }

    if (!formData.courseDescription) {
      newErrors.courseDescription = 'Course description is required';
    } else if (formData.courseDescription.length < 10) {
      newErrors.courseDescription = 'Description must be at least 10 characters';
    }

    if (!formData.instructor) {
      newErrors.instructor = 'Instructor name is required';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onUpdate(course._id, formData);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Edit Course</h2>
          <button className="close-btn" onClick={onClose}>
            <FiX />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label>Course Name</label>
            <input
              type="text"
              name="courseName"
              value={formData.courseName}
              onChange={handleChange}
              placeholder="Enter course name"
            />
            {errors.courseName && <div className="error-message">{errors.courseName}</div>}
          </div>

          <div className="form-group">
            <label>Course Description</label>
            <textarea
              name="courseDescription"
              value={formData.courseDescription}
              onChange={handleChange}
              placeholder="Enter course description"
              rows="4"
            />
            {errors.courseDescription && <div className="error-message">{errors.courseDescription}</div>}
          </div>

          <div className="form-group">
            <label>Instructor</label>
            <input
              type="text"
              name="instructor"
              value={formData.instructor}
              onChange={handleChange}
              placeholder="Enter instructor name"
            />
            {errors.instructor && <div className="error-message">{errors.instructor}</div>}
          </div>

          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Update Course
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCourseModal;