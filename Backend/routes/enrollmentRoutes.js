const express = require('express');
const {
  enrollClient,
  getEnrollments,
  getEnrollmentById,
  getClientEnrollments,
  updateEnrollment,
  deleteEnrollment
} = require('../controllers/enrollmentController');

const router = express.Router();

router.post('/', enrollClient);
router.get('/', getEnrollments);
router.get('/:id', getEnrollmentById);
router.get('/client/:clientId', getClientEnrollments);
router.put('/:id', updateEnrollment);
router.delete('/:id', deleteEnrollment);

module.exports = router;