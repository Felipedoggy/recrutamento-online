const express = require('express');
const router = express.Router();
const candidatosController = require('../controllers/candidatosController');

router.get('/', candidatosController.getAll);
router.get('/buscar', candidatosController.getByNome);
router.post('/', candidatosController.create);

module.exports = router;