const Candidato = require('../models/candidatosModel');

exports.getAll = async (req, res) => {
    try {
        const candidatos = await Candidato.getAll();
        res.json(candidatos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getByNome = async (req, res) => {
    try {
        const { nome } = req.query;
        const candidatos = await Candidato.getByNome(nome);
        res.json(candidatos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.create = async (req, res) => {
    try {
        const candidato = req.body;
        const result = await Candidato.create(candidato);
        res.status(201).json({ message: 'Candidato criado com sucesso', id: result.insertId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};