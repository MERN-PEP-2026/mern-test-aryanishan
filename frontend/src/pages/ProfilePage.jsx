import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import api from '../services/api';
import './ProfilePage.css';

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
    return <div className="loading-spinner"></div>;
  }

  if (!profileData) {
    return <p className="profile-empty">Profile data is unavailable right now.</p>;
  }

  const { user, stats, recentCourses } = profileData;

  return (
    <div className="profile-page">
      <section className="profile-header">
        <h1>{user.name}</h1>
        <p>{user.email}</p>
        <small>Joined on {formatDate(user.createdAt)}</small>
      </section>

      <section className="profile-stats">
        <div className="stat-box">
          <h3>Courses Created to Study</h3>
          <p>{stats.totalCoursesCreated}</p>
        </div>
        <div className="stat-box">
          <h3>Different Instructors Added</h3>
          <p>{stats.uniqueInstructorsUsed}</p>
        </div>
        <div className="stat-box">
          <h3>Total Description Words</h3>
          <p>{stats.totalDescriptionWords}</p>
        </div>
      </section>

      <section className="recent-courses">
        <h2>Recent Created Courses</h2>
        {recentCourses.length === 0 ? (
          <p className="profile-empty">You have not created any course yet.</p>
        ) : (
          <ul>
            {recentCourses.map((course) => (
              <li key={course._id}>
                <strong>{course.courseName}</strong>
                <span>{course.instructor}</span>
                <small>{formatDate(course.createdAt)}</small>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default ProfilePage;
