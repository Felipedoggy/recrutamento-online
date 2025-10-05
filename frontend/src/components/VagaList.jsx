import React, { useState, useEffect } from 'react';
import api from '../services/api';

const VagaList = ({ candidato }) => {
  const [vagas, setVagas] = useState([]);
  const [inscricoes, setInscricoes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingVagas, setLoadingVagas] = useState(true);

  useEffect(() => {
    if (candidato) {
      fetchVagas();
      fetchInscricoes();
    }
  }, [candidato]);

  const fetchVagas = async () => {
    setLoadingVagas(true);
    try {
      const response = await api.get('/vagas');
      setVagas(response.data);
    } catch (error) {
      console.error('Erro ao buscar vagas:', error);
      alert('Erro ao carregar vagas disponíveis');
    } finally {
      setLoadingVagas(false);
    }
  };

  const fetchInscricoes = async () => {
    try {
      const response = await api.get(`/inscricoes/candidato/${candidato.pk_cand_cpf}`);
      setInscricoes(response.data);
    } catch (error) {
      console.error('Erro ao buscar inscrições:', error);
    }
  };

  const handleInscricao = async (vaga) => {
    if (!candidato) {
      alert('Selecione um candidato primeiro');
      return;
    }

    setLoading(true);
    try {
      const inscricaoData = {
        data_inscricao: new Date().toISOString().split('T')[0],
        horario_inscricao: new Date().toLocaleTimeString('pt-BR', { 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
        pk_cand_cpf: candidato.pk_cand_cpf,
        pk_vaga_codigo: vaga.pk_vaga_codigo
      };

      await api.post('/inscricoes', inscricaoData);
      alert(`Inscrição para "${vaga.vaga_cargo}" realizada com sucesso!`);
      fetchInscricoes(); // Atualiza a lista de inscrições
    } catch (error) {
      if (error.response?.status === 400) {
        alert('Candidato já inscrito nesta vaga!');
      } else {
        console.error('Erro ao realizar inscrição:', error);
        alert('Erro ao realizar inscrição. Tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  const isInscrito = (vagaCodigo) => {
    return inscricoes.some(inscricao => inscricao.pk_vaga_codigo === vagaCodigo);
  };

  // Correção: h6 fechando com </h6> em vez de </h5>
  return (
    <div>
      {loadingVagas ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Carregando vagas...</span>
          </div>
          <p className="mt-2 text-muted">Carregando vagas disponíveis...</p>
        </div>
      ) : vagas.length === 0 ? (
        <p className="text-muted">Nenhuma vaga disponível no momento.</p>
      ) : (
        <div className="row">
          {vagas.map(vaga => (
            <div key={vaga.pk_vaga_codigo} className="col-md-6 mb-3">
              <div className="card h-100">
                <div className="card-body">
                  <h6 className="card-title text-primary">{vaga.vaga_cargo}</h6>
                  <p className="card-text">
                    <strong>Salário:</strong> R$ {parseFloat(vaga.vaga_salario).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}<br/>
                    <strong>Cidade:</strong> {vaga.vaga_cidade}<br/>
                    <strong>Vagas disponíveis:</strong> {vaga.vaga_quantidade}
                    {vaga.vaga_descricao && (
                      <>
                        <br/><strong>Descrição:</strong> {vaga.vaga_descricao}
                      </>
                    )}
                  </p>
                  <button
                    className={`btn btn-sm ${
                      isInscrito(vaga.pk_vaga_codigo) 
                        ? 'btn-success' 
                        : 'btn-primary'
                    }`}
                    onClick={() => handleInscricao(vaga)}
                    disabled={isInscrito(vaga.pk_vaga_codigo) || loading}
                  >
                    {isInscrito(vaga.pk_vaga_codigo) 
                      ? '✓ Inscrito' 
                      : loading ? 'Inscrevendo...' : 'Inscrever-se'
                    }
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VagaList;