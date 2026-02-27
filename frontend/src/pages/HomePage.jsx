import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { ROUTES } from '../utils/constants';

const HomePage = () => {
  const [overview, setOverview] = useState({
    website: { totalUsers: 0, totalCourses: 0 },
    topInstructors: [],
    topCourses: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOverview = async () => {
      try {
        const res = await api.get('/public/overview');
        setOverview(res.data.data);
      } catch (error) {
        console.error('Failed to load overview', error);
      } finally {
        setLoading(false);
      }
    };
    loadOverview();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-indigo-500 to-cyan-500 p-8 text-white shadow-soft sm:p-10">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-100">CourseFlow Platform</p>
        <h1 className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl">
          Build your complete learning system with confidence.
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-indigo-100 sm:text-base">
          Organize courses, track instructor quality, and plan your academic roadmap through one
          production-grade dashboard.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to={ROUTES.COURSES_CREATE}
            className="rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-indigo-700 transition hover:bg-indigo-50"
          >
            Create your first course
          </Link>
          <Link
            to={ROUTES.COURSES_MY}
            className="rounded-xl border border-white/40 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Explore my courses
          </Link>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl bg-white p-5 shadow-soft dark:bg-slate-900">
          <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Total Users</p>
          <p className="mt-2 text-3xl font-extrabold text-indigo-600">{overview.website.totalUsers}</p>
        </div>
        <div className="rounded-2xl bg-white p-5 shadow-soft dark:bg-slate-900">
          <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Total Courses</p>
          <p className="mt-2 text-3xl font-extrabold text-indigo-600">{overview.website.totalCourses}</p>
        </div>
        <div className="rounded-2xl bg-white p-5 shadow-soft dark:bg-slate-900">
          <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Top Instructors</p>
          <p className="mt-2 text-3xl font-extrabold text-indigo-600">{overview.topInstructors.length}</p>
        </div>
        <div className="rounded-2xl bg-white p-5 shadow-soft dark:bg-slate-900">
          <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Featured Courses</p>
          <p className="mt-2 text-3xl font-extrabold text-indigo-600">{overview.topCourses.length}</p>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl bg-white p-5 shadow-soft dark:bg-slate-900">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Top Instructors</h2>
          <div className="mt-4 space-y-3">
            {overview.topInstructors.length === 0 ? (
              <p className="text-sm text-slate-500 dark:text-slate-400">No instructor data available.</p>
            ) : (
              overview.topInstructors.map((instructor, index) => (
                <div key={instructor.name} className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800">
                  <p className="font-semibold text-slate-900 dark:text-white">
                    {index + 1}. {instructor.name}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{instructor.totalCourses} courses</p>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-soft dark:bg-slate-900">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Top Courses</h2>
          <div className="mt-4 space-y-3">
            {overview.topCourses.length === 0 ? (
              <p className="text-sm text-slate-500 dark:text-slate-400">No course data available.</p>
            ) : (
              overview.topCourses.map((course, index) => (
                <div key={course._id} className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800">
                  <p className="font-semibold text-slate-900 dark:text-white">
                    {index + 1}. {course.courseName}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Instructor: {course.instructor}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {[
          {
            title: 'Plan with Clarity',
            description:
              'Define courses with full descriptions and map your semester goals with better visibility.'
          },
          {
            title: 'Track with Confidence',
            description:
              'Keep every course updated, quickly find records, and maintain a clean academic archive.'
          },
          {
            title: 'Grow with Insights',
            description:
              'Use instructor and course trends to focus on high-value topics for your development.'
          }
        ].map((item) => (
          <article key={item.title} className="rounded-2xl bg-white p-5 shadow-soft dark:bg-slate-900">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">{item.title}</h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{item.description}</p>
          </article>
        ))}
      </section>

      <section className="rounded-2xl bg-white p-6 shadow-soft dark:bg-slate-900">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">How CourseFlow helps you daily</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {[
            'Create and categorize courses by instructor expertise.',
            'Edit course details anytime without losing track history.',
            'Search through your course library instantly.',
            'Use profile metrics to evaluate your learning depth.'
          ].map((line) => (
            <div key={line} className="rounded-xl bg-indigo-50 px-4 py-3 text-sm font-medium text-indigo-700 dark:bg-slate-800 dark:text-indigo-300">
              {line}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
