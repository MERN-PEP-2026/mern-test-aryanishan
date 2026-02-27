const Course = require('../models/Course');
const User = require('../models/User');

// @desc    Public website overview data
// @route   GET /api/public/overview
// @access  Public
exports.getOverview = async (req, res) => {
  try {
    const [totalUsers, totalCourses, topInstructors, topCourses] = await Promise.all([
      User.countDocuments(),
      Course.countDocuments(),
      Course.aggregate([
        { $group: { _id: '$instructor', totalCourses: { $sum: 1 } } },
        { $sort: { totalCourses: -1, _id: 1 } },
        { $limit: 3 },
        { $project: { _id: 0, name: '$_id', totalCourses: 1 } }
      ]),
      Course.find({}, { courseName: 1, instructor: 1, courseDescription: 1, createdAt: 1 })
        .sort({ createdAt: -1 })
        .limit(3)
    ]);

    res.json({
      success: true,
      data: {
        website: {
          totalUsers,
          totalCourses
        },
        topInstructors,
        topCourses
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
