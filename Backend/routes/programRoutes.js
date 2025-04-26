const express = require('express');
const {
  createProgram,
  getPrograms,
  getProgramById,
  updateProgram,
  deleteProgram
} = require('../controllers/programController');

const router = express.Router();

router.post('/', createProgram);
router.get('/', getPrograms);
router.get('/:id', getProgramById);
router.put('/:id', updateProgram);
router.delete('/:id', deleteProgram);

module.exports = router;