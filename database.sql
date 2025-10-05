-- Criar banco de dados
CREATE DATABASE IF NOT EXISTS recrutamento_db;
USE recrutamento_db;

-- Tabela de Candidatos
CREATE TABLE candidatos (
    pk_cand_cpf VARCHAR(14) PRIMARY KEY,
    cand_nome VARCHAR(100) NOT NULL,
    cand_endereco VARCHAR(200) NOT NULL,
    cand_telefone VARCHAR(20) NOT NULL,
    cand_email VARCHAR(100),
    cand_data_nasc DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Vagas
CREATE TABLE vagas (
    pk_vaga_codigo INT AUTO_INCREMENT PRIMARY KEY,
    vaga_cargo VARCHAR(100) NOT NULL,
    vaga_salario DECIMAL(10,2) NOT NULL,
    vaga_cidade VARCHAR(50) NOT NULL,
    vaga_quantidade INT NOT NULL,
    vaga_descricao TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Inscrições (Relacionamento Muitos para Muitos)
CREATE TABLE inscricoes (
    data_inscricao DATE NOT NULL,
    horario_inscricao TIME NOT NULL,
    pk_cand_cpf VARCHAR(14),
    pk_vaga_codigo INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (pk_cand_cpf, pk_vaga_codigo),
    FOREIGN KEY (pk_cand_cpf) REFERENCES candidatos(pk_cand_cpf) ON DELETE CASCADE,
    FOREIGN KEY (pk_vaga_codigo) REFERENCES vagas(pk_vaga_codigo) ON DELETE CASCADE
);

-- Inserir dados de exemplo
INSERT INTO candidatos (pk_cand_cpf, cand_nome, cand_endereco, cand_telefone, cand_email, cand_data_nasc) VALUES
('123.456.789-00', 'João Silva', 'Rua A, 123 - Centro', '(11) 9999-8888', 'joao.silva@email.com', '1990-05-15'),
('987.654.321-00', 'Maria Santos', 'Av. B, 456 - Jardim', '(11) 7777-6666', 'maria.santos@email.com', '1985-08-20'),
('111.222.333-44', 'Pedro Oliveira', 'Rua C, 789 - Vila', '(11) 5555-4444', 'pedro.oliveira@email.com', '1992-12-10');

INSERT INTO vagas (vaga_cargo, vaga_salario, vaga_cidade, vaga_quantidade, vaga_descricao) VALUES
('Desenvolvedor Full Stack', 5000.00, 'São Paulo', 3, 'Desenvolvimento de aplicações web com React e Node.js'),
('Analista de Sistemas', 4500.00, 'Rio de Janeiro', 2, 'Análise e documentação de requisitos de sistema'),
('Designer UX/UI', 4000.00, 'São Paulo', 1, 'Criação de interfaces e experiência do usuário'),
('Gerente de Projetos', 7000.00, 'Belo Horizonte', 1, 'Gerenciamento de projetos de TI');

INSERT INTO inscricoes (data_inscricao, horario_inscricao, pk_cand_cpf, pk_vaga_codigo) VALUES
('2024-03-20', '10:30:00', '123.456.789-00', 1),
('2024-03-20', '11:15:00', '123.456.789-00', 2),
('2024-03-19', '14:20:00', '987.654.321-00', 1);
