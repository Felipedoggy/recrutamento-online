import React, { useState } from 'react';
import api from '../services/api';

const CandidatoForm = ({ onCandidatoCreated, onCancel }) => {
  const [formData, setFormData] = useState({
    pk_cand_cpf: '',
    cand_nome: '',
    cand_endereco: '',
    cand_telefone: '',
    cand_email: '',
    cand_data_nasc: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/candidatos', formData);
      onCandidatoCreated(formData);
      alert('Candidato cadastrado com sucesso!');
    } catch (error) {
      console.error('Erro ao cadastrar candidato:', error);
      alert('Erro ao cadastrar candidato');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="card mt-3">
      <div className="card-header">
        <h6>Cadastrar Novo Candidato</h6>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6">
              <div className="mb-2">
                <label className="form-label">CPF</label>
                <input
                  type="text"
                  className="form-control"
                  name="pk_cand_cpf"
                  value={formData.pk_cand_cpf}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-2">
                <label className="form-label">Nome</label>
                <input
                  type="text"
                  className="form-control"
                  name="cand_nome"
                  value={formData.cand_nome}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="mb-2">
            <label className="form-label">Endereço</label>
            <input
              type="text"
              className="form-control"
              name="cand_endereco"
              value={formData.cand_endereco}
              onChange={handleChange}
              required
            />
          </div>

          <div className="row">
            <div className="col-md-6">
              <div className="mb-2">
                <label className="form-label">Telefone</label>
                <input
                  type="text"
                  className="form-control"
                  name="cand_telefone"
                  value={formData.cand_telefone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-2">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="cand_email"
                  value={formData.cand_email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Data de Nascimento</label>
            <input
              type="date"
              className="form-control"
              name="cand_data_nasc"
              value={formData.cand_data_nasc}
              onChange={handleChange}
              required
            />
          </div>

          <div className="d-flex gap-2">
            <button type="submit" className="btn btn-primary">Cadastrar</button>
            <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CandidatoForm;