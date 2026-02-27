import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import api from '../services/api';

const formatDate = (value) => {
  if (!value) return 'N/A';
  return new Date(value).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const ProfilePage = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await api.get('/user/profile');
        setProfileData(res.data.data);
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600" />
      </div>
    );
  }

  if (!profileData) {
    return <p className="text-sm text-slate-500 dark:text-slate-400">Profile data is unavailable right now.</p>;
  }

  const { user, stats, recentCourses } = profileData;

  return (
    <div className="space-y-6">
      <section className="rounded-2xl bg-gradient-to-r from-slate-900 to-indigo-900 p-6 text-white shadow-soft">
        <h1 className="text-2xl font-extrabold">{user.name}</h1>
        <p className="mt-1 text-sm text-indigo-100">{user.email}</p>
        <p className="mt-1 text-xs text-indigo-200">Joined on {formatDate(user.createdAt)}</p>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        {[
          ['Courses Created', stats.totalCoursesCreated],
          ['Different Instructors', stats.uniqueInstructorsUsed],
          ['Description Words', stats.totalDescriptionWords]
        ].map(([label, value]) => (
          <div key={label} className="rounded-2xl bg-white p-5 shadow-soft dark:bg-slate-900">
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">{label}</p>
            <p className="mt-2 text-3xl font-extrabold text-indigo-600">{value}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl bg-white p-6 shadow-soft dark:bg-slate-900 lg:col-span-2">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Recent Created Courses</h2>
          {recentCourses.length === 0 ? (
            <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">You have not created any course yet.</p>
          ) : (
            <div className="mt-4 space-y-3">
              {recentCourses.map((course) => (
                <div key={course._id} className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800">
                  <p className="font-semibold text-slate-900 dark:text-white">{course.courseName}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{course.instructor}</p>
                  <p className="text-xs text-slate-400 dark:text-slate-500">{formatDate(course.createdAt)}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl bg-white p-5 shadow-soft dark:bg-slate-900">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Learning Goals</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li>- Publish at least 2 courses this month</li>
              <li>- Add practical outcomes in all descriptions</li>
              <li>- Diversify instructor coverage by topic</li>
            </ul>
          </div>
          <div className="rounded-2xl bg-white p-5 shadow-soft dark:bg-slate-900">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Account Health</h3>
            <div className="mt-3 space-y-2">
              {['Profile completed', 'Active course updates', 'Consistent content quality'].map((item) => (
                <p key={item} className="rounded-xl bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700 dark:bg-slate-800 dark:text-emerald-300">
                  {item}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProfilePage;
