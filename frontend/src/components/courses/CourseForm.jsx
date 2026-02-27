import React, { useState } from 'react';

const CourseForm = ({ onSubmit, initialData = {} }) => {
  const [formData, setFormData] = useState({
    courseName: initialData.courseName || '',
    courseDescription: initialData.courseDescription || '',
    instructor: initialData.instructor || ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const nextErrors = {};
    if (!formData.courseName) {
      nextErrors.courseName = 'Course name is required';
    } else if (formData.courseName.length < 3) {
      nextErrors.courseName = 'Course name must be at least 3 characters';
    }

    if (!formData.courseDescription) {
      nextErrors.courseDescription = 'Course description is required';
    } else if (formData.courseDescription.length < 10) {
      nextErrors.courseDescription = 'Description must be at least 10 characters';
    }

    if (!formData.instructor) {
      nextErrors.instructor = 'Instructor name is required';
    }
    return nextErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nextErrors = validateForm();
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    onSubmit(formData);
    if (!initialData.courseName) {
      setFormData({ courseName: '', courseDescription: '', instructor: '' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="mb-1.5 block text-sm font-semibold text-slate-700 dark:text-slate-200">Course Name</label>
        <input
          type="text"
          name="courseName"
          value={formData.courseName}
          onChange={handleChange}
          placeholder="Enter course name"
          className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
        />
        {errors.courseName ? <p className="mt-1 text-xs text-rose-500">{errors.courseName}</p> : null}
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-semibold text-slate-700 dark:text-slate-200">Course Description</label>
        <textarea
          name="courseDescription"
          value={formData.courseDescription}
          onChange={handleChange}
          placeholder="Enter course description"
          className="min-h-[120px] w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
        />
        {errors.courseDescription ? <p className="mt-1 text-xs text-rose-500">{errors.courseDescription}</p> : null}
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-semibold text-slate-700 dark:text-slate-200">Instructor</label>
        <input
          type="text"
          name="instructor"
          value={formData.instructor}
          onChange={handleChange}
          placeholder="Enter instructor name"
          className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
        />
        {errors.instructor ? <p className="mt-1 text-xs text-rose-500">{errors.instructor}</p> : null}
      </div>

      <button
        type="submit"
        className="inline-flex rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
      >
        {initialData.courseName ? 'Update Course' : 'Create Course'}
      </button>
    </form>
  );
};

export default CourseForm;
