const express = require('express');
const {
  registerClient,
  getClients,
  getClientById,
  updateClient,
  deleteClient,
  searchClients
} = require('../controllers/clientController');

const router = express.Router();

router.post('/', registerClient);
router.get('/', getClients);
router.get('/search', searchClients);
router.get('/:id', getClientById);
router.put('/:id', updateClient);
router.delete('/:id', deleteClient);

module.exports = router;