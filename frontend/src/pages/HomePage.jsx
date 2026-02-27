import React, { useEffect, useState } from 'react';
import api from '../services/api';
import './HomePage.css';

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
    return <div className="loading-spinner"></div>;
  }

  return (
    <div className="home-page">
      <section className="hero-panel">
        <h1>Student Course Management Platform</h1>
        <p>
          Manage your learning journey with course planning, instructor-focused tracking,
          and clean progress visibility in one place.
        </p>
      </section>

      <section className="overview-grid">
        <div className="metric-card">
          <h3>Total Registered Users</h3>
          <p>{overview.website.totalUsers}</p>
        </div>
        <div className="metric-card">
          <h3>Total Courses Created</h3>
          <p>{overview.website.totalCourses}</p>
        </div>
      </section>

      <section className="list-grid">
        <div className="info-card">
          <h2>Top 3 Instructors</h2>
          {overview.topInstructors.length === 0 ? (
            <p className="placeholder-text">No instructor data available yet.</p>
          ) : (
            <ul>
              {overview.topInstructors.map((instructor, index) => (
                <li key={instructor.name}>
                  <span>
                    {index + 1}. {instructor.name}
                  </span>
                  <strong>{instructor.totalCourses} courses</strong>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="info-card">
          <h2>Top 3 Courses</h2>
          {overview.topCourses.length === 0 ? (
            <p className="placeholder-text">No course data available yet.</p>
          ) : (
            <ul>
              {overview.topCourses.map((course, index) => (
                <li key={course._id}>
                  <span>
                    {index + 1}. {course.courseName}
                  </span>
                  <small>Instructor: {course.instructor}</small>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
