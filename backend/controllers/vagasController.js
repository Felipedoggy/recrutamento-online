const Vaga = require('../models/vagasModel');

exports.getAll = async (req, res) => {
    try {
        const vagas = await Vaga.getAll();
        res.json(vagas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};