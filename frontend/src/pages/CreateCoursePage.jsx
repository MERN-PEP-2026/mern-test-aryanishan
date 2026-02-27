import React from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import CourseForm from '../components/courses/CourseForm';
import api from '../services/api';
import { ROUTES, TOAST_MESSAGES } from '../utils/constants';

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
    <div className="space-y-6">
      <div className="rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 p-6 text-white shadow-soft">
        <h1 className="text-2xl font-extrabold">Create New Course</h1>
        <p className="mt-1 text-sm text-violet-100">
          Add complete course details to keep your learning library practical and structured.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            to={ROUTES.COURSES_MY}
            className="rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-indigo-700 transition hover:bg-indigo-50"
          >
            View My Courses
          </Link>
          <Link
            to={ROUTES.PROFILE}
            className="rounded-xl border border-white/40 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Open Profile
          </Link>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <section className="rounded-2xl bg-white p-5 shadow-soft dark:bg-slate-900 lg:col-span-2">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Course details</h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Fill all fields carefully for better searchability and profile insights.
          </p>
          <div className="mt-5">
            <CourseForm onSubmit={createCourse} />
          </div>
        </section>

        <aside className="space-y-4">
          <div className="rounded-2xl bg-white p-5 shadow-soft dark:bg-slate-900">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Writing checklist</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li>- Use clear course titles (3+ characters).</li>
              <li>- Mention practical outcomes in description.</li>
              <li>- Keep one focused instructor per course.</li>
              <li>- Update old courses monthly.</li>
            </ul>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-soft dark:bg-slate-900">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Quality tips</h3>
            <div className="mt-3 space-y-2">
              {[
                'Start description with objective.',
                'Add tools/skills covered in the course.',
                'Keep notes concise and measurable.'
              ].map((tip) => (
                <p key={tip} className="rounded-xl bg-slate-50 px-3 py-2 text-sm text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                  {tip}
                </p>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default CreateCoursePage;
