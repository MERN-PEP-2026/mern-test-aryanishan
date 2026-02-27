const Course = require('../models/Course');
const User = require('../models/User');

// @desc    Get user profile and stats
// @route   GET /api/user/profile
// @access  Private
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user).select('-password');
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const userCourses = await Course.find({ user: req.user }).sort({ createdAt: -1 });
    const totalCoursesCreated = userCourses.length;
    const uniqueInstructorsUsed = new Set(userCourses.map((course) => course.instructor)).size;
    const totalDescriptionWords = userCourses.reduce((sum, course) => {
      const words = (course.courseDescription || '').trim().split(/\s+/).filter(Boolean).length;
      return sum + words;
    }, 0);

    res.json({
      success: true,
      data: {
        user,
        stats: {
          totalCoursesCreated,
          uniqueInstructorsUsed,
          totalDescriptionWords,
          latestCourseCreatedAt: userCourses[0]?.createdAt || null
        },
        recentCourses: userCourses.slice(0, 3)
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};
