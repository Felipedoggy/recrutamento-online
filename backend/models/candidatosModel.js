const db = require('../config/db');

const Candidato = {
    getAll: () => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM candidatos', (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });
    },

    getByNome: (nome) => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM candidatos WHERE cand_nome LIKE ?', [`%${nome}%`], (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });
    },

    getByCpf: (cpf) => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM candidatos WHERE pk_cand_cpf = ?', [cpf], (err, results) => {
                if (err) reject(err);
                resolve(results[0]);
            });
        });
    },

    create: (candidato) => {
        return new Promise((resolve, reject) => {
            const { pk_cand_cpf, cand_nome, cand_endereco, cand_telefone, cand_email, cand_data_nasc } = candidato;
            db.query(
                'INSERT INTO candidatos (pk_cand_cpf, cand_nome, cand_endereco, cand_telefone, cand_email, cand_data_nasc) VALUES (?, ?, ?, ?, ?, ?)',
                [pk_cand_cpf, cand_nome, cand_endereco, cand_telefone, cand_email, cand_data_nasc],
                (err, results) => {
                    if (err) reject(err);
                    resolve(results);
                }
            );
        });
    }
};

module.exports = Candidato;