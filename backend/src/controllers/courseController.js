const Course = require('../models/Course');

// @desc    Create a course
// @route   POST /api/courses
// @access  Private
exports.createCourse = async (req, res) => {
  try {
    const { courseName, courseDescription, instructor } = req.body;

    const course = new Course({
      courseName,
      courseDescription,
      instructor,
      user: req.user
    });

    await course.save();

    res.status(201).json({
      success: true,
      data: course
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ 
      success: false,
      message: 'Server error' 
    });
  }
};

// @desc    Get all courses for logged in user
// @route   GET /api/courses
// @access  Private
exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find({ user: req.user }).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: courses.length,
      data: courses
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ 
      success: false,
      message: 'Server error' 
    });
  }
};

// @desc    Get single course
// @route   GET /api/courses/:id
// @access  Private
exports.getCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ 
        success: false,
        message: 'Course not found' 
      });
    }

    // Check user owns course
    if (course.user.toString() !== req.user) {
      return res.status(401).json({ 
        success: false,
        message: 'Not authorized' 
      });
    }

    res.json({
      success: true,
      data: course
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ 
      success: false,
      message: 'Server error' 
    });
  }
};

// @desc    Update a course
// @route   PUT /api/courses/:id
// @access  Private
exports.updateCourse = async (req, res) => {
  try {
    const { courseName, courseDescription, instructor } = req.body;

    let course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ 
        success: false,
        message: 'Course not found' 
      });
    }

    // Check user owns course
    if (course.user.toString() !== req.user) {
      return res.status(401).json({ 
        success: false,
        message: 'Not authorized' 
      });
    }

    // Update course
    course = await Course.findByIdAndUpdate(
      req.params.id,
      { courseName, courseDescription, instructor },
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      data: course
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ 
      success: false,
      message: 'Server error' 
    });
  }
};

// @desc    Delete a course
// @route   DELETE /api/courses/:id
// @access  Private
exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ 
        success: false,
        message: 'Course not found' 
      });
    }

    // Check user owns course
    if (course.user.toString() !== req.user) {
      return res.status(401).json({ 
        success: false,
        message: 'Not authorized' 
      });
    }

    await course.deleteOne();

    res.json({
      success: true,
      message: 'Course removed successfully'
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ 
      success: false,
      message: 'Server error' 
    });
  }
};