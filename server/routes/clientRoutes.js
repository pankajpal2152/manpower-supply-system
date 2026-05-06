const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');
const { verifyToken, authorizeRoles } = require('../middlewares/authMiddleware');

// Protect all client routes
router.use(verifyToken);

router.get('/', clientController.getAllClients);

// ✅ DROPDOWN DATA ROUTES
router.get('/data/states', clientController.getStates);
router.get('/data/districts/:stateId', clientController.getDistricts);

router.post('/', authorizeRoles('Superadmin', 'HR Admin'), clientController.createClient);
router.put('/:id', authorizeRoles('Superadmin', 'HR Admin'), clientController.updateClient);
router.delete('/:id', authorizeRoles('Superadmin'), clientController.deleteClient);

module.exports = router;