import React, { useState } from 'react';
import api from '../services/api';

const CandidatoSearch = ({ onSelectCandidato, onShowForm }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [candidatos, setCandidatos] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    setLoading(true);
    try {
      const response = await api.get(`/candidatos/buscar?nome=${searchTerm}`);
      setCandidatos(response.data);
    } catch (error) {
      console.error('Erro ao buscar candidatos:', error);
      alert('Erro ao buscar candidatos');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch} className="mb-3">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar candidato por nome..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Buscando...' : 'Buscar'}
          </button>
        </div>
      </form>

      {candidatos.length > 0 && (
        <div className="mb-3">
          <h6>Candidatos Encontrados:</h6>
          <div className="list-group">
            {candidatos.map(candidato => (
              <button
                key={candidato.pk_cand_cpf}
                type="button"
                className="list-group-item list-group-item-action"
                onClick={() => onSelectCandidato(candidato)}
              >
                {candidato.cand_nome} - {candidato.pk_cand_cpf}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="text-center">
        <button 
          className="btn btn-outline-primary btn-sm"
          onClick={onShowForm}
        >
          Cadastrar Novo Candidato
        </button>
      </div>
    </div>
  );
};

export default CandidatoSearch;