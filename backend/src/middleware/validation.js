const { body, validationResult } = require('express-validator');

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }
  next();
};

const registerValidation = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  validateRequest
];

const loginValidation = [
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('password').notEmpty().withMessage('Password is required'),
  validateRequest
];

const courseValidation = [
  body('courseName').notEmpty().withMessage('Course name is required'),
  body('courseDescription').notEmpty().withMessage('Course description is required'),
  body('instructor').notEmpty().withMessage('Instructor name is required'),
  validateRequest
];

module.exports = {
  registerValidation,
  loginValidation,
  courseValidation
};