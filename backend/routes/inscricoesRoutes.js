const express = require('express');
const router = express.Router();
const inscricoesController = require('../controllers/inscricoesController');

router.get('/candidato/:cpf', inscricoesController.getByCandidato);
router.post('/', inscricoesController.create);

module.exports = router;