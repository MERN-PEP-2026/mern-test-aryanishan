const express = require('express');
const router = express.Router();
const {
  createCourse,
  getCourses,
  getCourse,
  updateCourse,
  deleteCourse
} = require('../controllers/courseController');
const { courseValidation } = require('../middleware/validation');
const auth = require('../middleware/auth');

router.use(auth); // All routes below require authentication

router.route('/')
  .post(courseValidation, createCourse)
  .get(getCourses);

router.route('/:id')
  .get(getCourse)
  .put(courseValidation, updateCourse)
  .delete(deleteCourse);

module.exports = router;