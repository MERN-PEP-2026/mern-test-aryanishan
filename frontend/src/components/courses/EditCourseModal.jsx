import React, { useState } from 'react';
import { FiX } from 'react-icons/fi';

const EditCourseModal = ({ course, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    courseName: course.courseName,
    courseDescription: course.courseDescription,
    instructor: course.instructor
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
    onUpdate(course._id, formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 px-4 py-6 backdrop-blur-sm">
      <div className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-2xl dark:bg-slate-900">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Edit Course</h2>
          <button
            className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
            onClick={onClose}
          >
            <FiX />
          </button>
        </div>

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
              rows="4"
              className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
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

          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
            >
              Update Course
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCourseModal;
