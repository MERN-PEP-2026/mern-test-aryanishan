import React, { useMemo, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { FiSearch } from 'react-icons/fi';
import CourseCard from '../components/courses/CourseCard';
import EditCourseModal from '../components/courses/EditCourseModal';
import api from '../services/api';
import { TOAST_MESSAGES } from '../utils/constants';

const MyCoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingCourse, setEditingCourse] = useState(null);
  const [query, setQuery] = useState('');

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

  const filteredCourses = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return courses;
    return courses.filter((course) => {
      return (
        course.courseName.toLowerCase().includes(normalized) ||
        course.instructor.toLowerCase().includes(normalized) ||
        course.courseDescription.toLowerCase().includes(normalized)
      );
    });
  }, [courses, query]);

  const summary = useMemo(() => {
    const instructors = new Set(courses.map((course) => course.instructor)).size;
    const avgWords =
      courses.length === 0
        ? 0
        : Math.round(
            courses.reduce((acc, course) => acc + course.courseDescription.split(/\s+/).length, 0) /
              courses.length
          );
    return { instructors, avgWords };
  }, [courses]);

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
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="h-52 animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white shadow-soft">
        <h1 className="text-2xl font-extrabold">My Created Courses</h1>
        <p className="mt-1 text-sm text-blue-100">
          Maintain, update, and discover your complete personal course catalog.
        </p>
      </div>

      <section className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl bg-white p-5 shadow-soft dark:bg-slate-900">
          <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Total Courses</p>
          <p className="mt-2 text-3xl font-extrabold text-indigo-600">{courses.length}</p>
        </div>
        <div className="rounded-2xl bg-white p-5 shadow-soft dark:bg-slate-900">
          <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Unique Instructors</p>
          <p className="mt-2 text-3xl font-extrabold text-indigo-600">{summary.instructors}</p>
        </div>
        <div className="rounded-2xl bg-white p-5 shadow-soft dark:bg-slate-900">
          <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Avg Description Words</p>
          <p className="mt-2 text-3xl font-extrabold text-indigo-600">{summary.avgWords}</p>
        </div>
      </section>

      <div className="rounded-2xl bg-white p-5 shadow-soft dark:bg-slate-900">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Course Library</h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Search, edit, or remove your courses.</p>
          </div>

          <div className="relative w-full sm:w-80">
            <FiSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search courses, instructor, description..."
              className="w-full rounded-xl border border-slate-300 py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            />
          </div>
        </div>
      </div>

      {filteredCourses.length === 0 ? (
        <div className="rounded-2xl bg-white p-10 text-center shadow-soft dark:bg-slate-900">
          <p className="text-base font-semibold text-slate-700 dark:text-slate-200">No courses found.</p>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Create new entries or adjust your search keyword to see results.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.map((course) => (
            <CourseCard
              key={course._id}
              course={course}
              onEdit={() => setEditingCourse(course)}
              onDelete={() => deleteCourse(course._id)}
            />
          ))}
        </div>
      )}

      <section className="rounded-2xl bg-white p-6 shadow-soft dark:bg-slate-900">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Productivity recommendations</h3>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {[
            'Keep course descriptions focused on outcomes and tools.',
            'Review and update outdated courses every two weeks.',
            'Use consistent naming for easier filtering and reporting.',
            'Capture one key note after each course milestone.'
          ].map((tip) => (
            <div key={tip} className="rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-600 dark:bg-slate-800 dark:text-slate-300">
              {tip}
            </div>
          ))}
        </div>
      </section>

      {editingCourse ? (
        <EditCourseModal
          course={editingCourse}
          onClose={() => setEditingCourse(null)}
          onUpdate={updateCourse}
        />
      ) : null}
    </div>
  );
};

export default MyCoursesPage;
