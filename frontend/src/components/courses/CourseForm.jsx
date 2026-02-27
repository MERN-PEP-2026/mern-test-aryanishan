import React, { useState } from 'react';
import './CourseForm.css';

const CourseForm = ({ onSubmit, initialData = {} }) => {
  const [formData, setFormData] = useState({
    courseName: initialData.courseName || '',
    courseDescription: initialData.courseDescription || '',
    instructor: initialData.instructor || ''
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

    onSubmit(formData);
    if (!initialData.courseName) {
      setFormData({
        courseName: '',
        courseDescription: '',
        instructor: ''
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="course-form">
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

      <button type="submit" className="btn btn-primary">
        {initialData.courseName ? 'Update Course' : 'Create Course'}
      </button>
    </form>
  );
};

export default CourseForm;