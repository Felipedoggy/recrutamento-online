import React, { useState, useEffect } from 'react';
import api from '../services/api';

const InscricoesList = ({ candidato }) => {
  const [inscricoes, setInscricoes] = useState([]);

  useEffect(() => {
    fetchInscricoes();
  }, [candidato]);

  const fetchInscricoes = async () => {
    try {
      const response = await api.get(`/inscricoes/candidato/${candidato.pk_cand_cpf}`);
      setInscricoes(response.data);
    } catch (error) {
      console.error('Erro ao buscar inscrições:', error);
    }
  };

  return (
    <div>
      {inscricoes.length === 0 ? (
        <p className="text-muted">Nenhuma inscrição realizada.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Vaga</th>
                <th>Salário</th>
                <th>Cidade</th>
                <th>Data Inscrição</th>
                <th>Horário</th>
              </tr>
            </thead>
            <tbody>
              {inscricoes.map(inscricao => (
                <tr key={`${inscricao.pk_cand_cpf}-${inscricao.pk_vaga_codigo}`}>
                  <td>{inscricao.vaga_cargo}</td>
                  <td>R$ {parseFloat(inscricao.vaga_salario).toFixed(2)}</td>
                  <td>{inscricao.vaga_cidade}</td>
                  <td>{new Date(inscricao.data_inscricao).toLocaleDateString('pt-BR')}</td>
                  <td>{inscricao.horario_inscricao}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default InscricoesList;