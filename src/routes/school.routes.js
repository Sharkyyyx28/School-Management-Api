const express = require('express');
const router = express.Router();

const { addSchool, listSchools } = require('../controllers/school.controller');
const {
  addSchoolValidation,
  listSchoolsValidation,
  handleValidationErrors,
} = require('../middleware/validation');

router.post('/addSchool', addSchoolValidation, handleValidationErrors, addSchool);

router.get('/listSchools', listSchoolsValidation, handleValidationErrors, listSchools);

module.exports = router;
