const Inscricao = require('../models/inscricoesModel');

exports.getByCandidato = async (req, res) => {
    try {
        const { cpf } = req.params;
        const inscricoes = await Inscricao.getByCandidato(cpf);
        res.json(inscricoes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.create = async (req, res) => {
    try {
        const inscricao = req.body;
        
        // Verificar se já existe inscrição para esta vaga
        const isDuplicate = await Inscricao.checkDuplicate(inscricao.pk_cand_cpf, inscricao.pk_vaga_codigo);
        if (isDuplicate) {
            return res.status(400).json({ error: 'Candidato já inscrito nesta vaga' });
        }

        const result = await Inscricao.create(inscricao);
        res.status(201).json({ message: 'Inscrição realizada com sucesso' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};