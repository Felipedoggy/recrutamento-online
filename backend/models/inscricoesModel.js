const db = require('../config/db');

const Inscricao = {
    getByCandidato: (cpf) => {
        return new Promise((resolve, reject) => {
            db.query(`
                SELECT i.*, v.vaga_cargo, v.vaga_salario, v.vaga_cidade 
                FROM inscricoes i 
                JOIN vagas v ON i.pk_vaga_codigo = v.pk_vaga_codigo 
                WHERE i.pk_cand_cpf = ?
            `, [cpf], (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });
    },

    create: (inscricao) => {
        return new Promise((resolve, reject) => {
            const { data_inscricao, horario_inscricao, pk_cand_cpf, pk_vaga_codigo } = inscricao;
            db.query(
                'INSERT INTO inscricoes (data_inscricao, horario_inscricao, pk_cand_cpf, pk_vaga_codigo) VALUES (?, ?, ?, ?)',
                [data_inscricao, horario_inscricao, pk_cand_cpf, pk_vaga_codigo],
                (err, results) => {
                    if (err) reject(err);
                    resolve(results);
                }
            );
        });
    },

    checkDuplicate: (cpf, vaga_codigo) => {
        return new Promise((resolve, reject) => {
            db.query(
                'SELECT * FROM inscricoes WHERE pk_cand_cpf = ? AND pk_vaga_codigo = ?',
                [cpf, vaga_codigo],
                (err, results) => {
                    if (err) reject(err);
                    resolve(results.length > 0);
                }
            );
        });
    }
};

module.exports = Inscricao;