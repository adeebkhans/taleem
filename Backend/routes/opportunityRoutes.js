const express = require('express');
const { getOpportunities, addOpportunity, deleteOpportunity } = require('../controllers/opportunityController');
const authMiddleware = require('../controllers/authMiddleware'); // Import authentication middleware

const router = express.Router();

router.get('/', getOpportunities);
router.post('/', authMiddleware, addOpportunity); // Protected route
router.delete('/:id', authMiddleware, deleteOpportunity); // Protected route

module.exports = router;
