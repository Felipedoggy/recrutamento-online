require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./config/db');

// Importar rotas
const candidatosRoutes = require('./routes/candidatosRoutes');
const vagasRoutes = require('./routes/vagasRoutes');
const inscricoesRoutes = require('./routes/inscricoesRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rotas
app.use('/candidatos', candidatosRoutes);
app.use('/vagas', vagasRoutes);
app.use('/inscricoes', inscricoesRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});