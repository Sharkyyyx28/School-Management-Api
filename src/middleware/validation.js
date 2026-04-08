const { body, query, validationResult } = require('express-validator');

const addSchoolValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('School name is required')
    .isLength({ max: 255 })
    .withMessage('School name must not exceed 255 characters'),

  body('address')
    .trim()
    .notEmpty()
    .withMessage('Address is required')
    .isLength({ max: 500 })
    .withMessage('Address must not exceed 500 characters'),

  body('latitude')
    .notEmpty()
    .withMessage('Latitude is required')
    .isFloat({ min: -90, max: 90 })
    .withMessage('Latitude must be a valid float between -90 and 90'),

  body('longitude')
    .notEmpty()
    .withMessage('Longitude is required')
    .isFloat({ min: -180, max: 180 })
    .withMessage('Longitude must be a valid float between -180 and 180'),
];

const listSchoolsValidation = [
  query('latitude')
    .notEmpty()
    .withMessage('Latitude query parameter is required')
    .isFloat({ min: -90, max: 90 })
    .withMessage('Latitude must be a valid float between -90 and 90'),

  query('longitude')
    .notEmpty()
    .withMessage('Longitude query parameter is required')
    .isFloat({ min: -180, max: 180 })
    .withMessage('Longitude must be a valid float between -180 and 180'),
];

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map((err) => ({
        field: err.path,
        message: err.msg,
      })),
    });
  }
  next();
};

module.exports = {
  addSchoolValidation,
  listSchoolsValidation,
  handleValidationErrors,
};
