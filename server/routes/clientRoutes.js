const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');
const { verifyToken, authorizeRoles } = require('../middlewares/authMiddleware');

// Protect all client routes
router.use(verifyToken);

router.get('/', clientController.getAllClients);
router.post('/', authorizeRoles('Superadmin', 'HR Admin'), clientController.createClient);
router.put('/:id', authorizeRoles('Superadmin', 'HR Admin'), clientController.updateClient);
router.delete('/:id', authorizeRoles('Superadmin'), clientController.deleteClient);

module.exports = router;