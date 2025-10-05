import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import CandidatoSearch from './components/CandidatoSearch';
import CandidatoForm from './components/CandidatoForm';
import VagaList from './components/VagaList';
import InscricoesList from './components/InscricoesList';
import './App.css';

function App() {
  const [selectedCandidato, setSelectedCandidato] = useState(null);
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="App">
      <div className="container-fluid">
        <header className="bg-primary text-white p-3 mb-4">
          <h1 className="text-center">Sistema de Recrutamento Online</h1>
        </header>

        <div className="row">
          <div className="col-md-4">
            <div className="card">
              <div className="card-header">
                <h5>Buscar Candidato</h5>
              </div>
              <div className="card-body">
                <CandidatoSearch 
                  onSelectCandidato={setSelectedCandidato}
                  onShowForm={() => setShowForm(true)}
                />
                
                {showForm && (
                  <CandidatoForm 
                    onCandidatoCreated={(candidato) => {
                      setSelectedCandidato(candidato);
                      setShowForm(false);
                    }}
                    onCancel={() => setShowForm(false)}
                  />
                )}
              </div>
            </div>

            {selectedCandidato && (
              <div className="card mt-3">
                <div className="card-header">
                  <h5>Candidato Selecionado</h5>
                </div>
                <div className="card-body">
                  <p><strong>Nome:</strong> {selectedCandidato.cand_nome}</p>
                  <p><strong>CPF:</strong> {selectedCandidato.pk_cand_cpf}</p>
                  <p><strong>Telefone:</strong> {selectedCandidato.cand_telefone}</p>
                </div>
              </div>
            )}
          </div>

          <div className="col-md-8">
            {selectedCandidato ? (
              <>
                <div className="card">
                  <div className="card-header">
                    <h5>Vagas Disponíveis</h5>
                  </div>
                  <div className="card-body">
                    <VagaList candidato={selectedCandidato} />
                  </div>
                </div>

                <div className="card mt-4">
                  <div className="card-header">
                    <h5>Inscrições do Candidato</h5>
                  </div>
                  <div className="card-body">
                    <InscricoesList candidato={selectedCandidato} />
                  </div>
                </div>
              </>
            ) : (
              <div className="card">
                <div className="card-body text-center">
                  <p className="text-muted">Selecione ou cadastre um candidato para ver as vagas disponíveis</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;