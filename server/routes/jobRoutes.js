const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');
const { verifyToken, authorizeRoles } = require('../middlewares/authMiddleware');

router.use(verifyToken);

router.get('/', jobController.getAllJobs);
router.get('/data/states', jobController.getStates);
router.get('/data/districts/:stateId', jobController.getDistricts);

router.post('/', authorizeRoles('Superadmin', 'HR Admin'), jobController.createJob);
router.put('/:id', authorizeRoles('Superadmin', 'HR Admin'), jobController.updateJob);
router.delete('/:id', authorizeRoles('Superadmin'), jobController.deleteJob);

module.exports = router;