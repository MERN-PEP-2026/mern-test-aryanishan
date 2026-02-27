import React from 'react';
import { FiEdit2, FiTrash2, FiCalendar, FiUser } from 'react-icons/fi';

const CourseCard = ({ course, onEdit, onDelete }) => {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <article className="flex h-full flex-col rounded-2xl bg-white p-5 shadow-soft transition hover:-translate-y-1 hover:shadow-lg dark:bg-slate-900">
      <div className="mb-3 flex items-start justify-between gap-2">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">{course.courseName}</h3>
        <div className="flex items-center gap-2">
          <button
            onClick={onEdit}
            className="rounded-lg p-2 text-slate-500 transition hover:bg-indigo-50 hover:text-indigo-600 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-indigo-300"
            title="Edit course"
          >
            <FiEdit2 />
          </button>
          <button
            onClick={onDelete}
            className="rounded-lg p-2 text-slate-500 transition hover:bg-rose-50 hover:text-rose-600 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-rose-300"
            title="Delete course"
          >
            <FiTrash2 />
          </button>
        </div>
      </div>

      <div className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-300">
        <FiUser />
        <span>{course.instructor}</span>
      </div>

      <p className="mb-4 flex-1 text-sm leading-6 text-slate-600 dark:text-slate-400">{course.courseDescription}</p>

      <div className="mt-auto border-t border-slate-200 pt-4 text-xs font-medium text-slate-500 dark:border-slate-700 dark:text-slate-400">
        <div className="inline-flex items-center gap-2">
          <FiCalendar />
          <span>{formatDate(course.createdAt)}</span>
        </div>
      </div>
    </article>
  );
};

export default CourseCard;
