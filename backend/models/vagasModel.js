const db = require('../config/db');

const Vaga = {
    getAll: () => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM vagas', (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });
    },

    getById: (id) => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM vagas WHERE pk_vaga_codigo = ?', [id], (err, results) => {
                if (err) reject(err);
                resolve(results[0]);
            });
        });
    }
};

module.exports = Vaga;