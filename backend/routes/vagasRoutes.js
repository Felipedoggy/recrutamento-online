const express = require('express');
const router = express.Router();
const vagasController = require('../controllers/vagasController');

router.get('/', vagasController.getAll);

module.exports = router;