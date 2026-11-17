
-- =========================================
-- BANCO DE DADOS DA LOJA VINYL
-- =========================================

CREATE DATABASE IF NOT EXISTS vinyl
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE vinyl;


-- =========================================
-- TABELA DE USUÁRIOS
-- =========================================

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- =========================================
-- TABELA DE ARTISTAS
-- =========================================

CREATE TABLE artistas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(150) NOT NULL UNIQUE,
    descricao TEXT,
    imagem VARCHAR(255)
);


-- =========================================
-- TABELA DE DISCOS
-- =========================================

CREATE TABLE discos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    artista_id INT NOT NULL,
    nome VARCHAR(150) NOT NULL,
    descricao TEXT,
    preco DECIMAL(10,2) NOT NULL,
    imagem VARCHAR(255),
    estoque INT NOT NULL DEFAULT 0,

    categoria ENUM(
        'catalogo',
        'pre_venda',
        'voltou_estoque'
    ) DEFAULT 'catalogo',

    ativo BOOLEAN DEFAULT TRUE,

    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (artista_id)
        REFERENCES artistas(id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
);


-- =========================================
-- TABELA DE CARRINHOS
-- =========================================

CREATE TABLE carrinho (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL UNIQUE,

    FOREIGN KEY (usuario_id)
        REFERENCES usuarios(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);


-- =========================================
-- ITENS DO CARRINHO
-- =========================================

CREATE TABLE itens_carrinho (
    id INT AUTO_INCREMENT PRIMARY KEY,
    carrinho_id INT NOT NULL,
    disco_id INT NOT NULL,
    quantidade INT NOT NULL DEFAULT 1,

    FOREIGN KEY (carrinho_id)
        REFERENCES carrinho(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    FOREIGN KEY (disco_id)
        REFERENCES discos(id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,

    UNIQUE (carrinho_id, disco_id)
);


-- =========================================
-- LISTA DE DESEJOS
-- =========================================

CREATE TABLE favoritos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    disco_id INT NOT NULL,

    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (usuario_id)
        REFERENCES usuarios(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    FOREIGN KEY (disco_id)
        REFERENCES discos(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    UNIQUE (usuario_id, disco_id)
);


-- =========================================
-- TABELA DE PEDIDOS
-- =========================================

CREATE TABLE pedidos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,

    valor_total DECIMAL(10,2) NOT NULL,

    status ENUM(
        'pendente',
        'processando',
        'enviado',
        'entregue',
        'cancelado'
    ) DEFAULT 'pendente',

    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (usuario_id)
        REFERENCES usuarios(id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
);


-- =========================================
-- ITENS DOS PEDIDOS
-- =========================================

CREATE TABLE itens_pedido (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pedido_id INT NOT NULL,
    disco_id INT NOT NULL,

    nome_disco VARCHAR(150) NOT NULL,
    preco_unitario DECIMAL(10,2) NOT NULL,
    quantidade INT NOT NULL,

    FOREIGN KEY (pedido_id)
        REFERENCES pedidos(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    FOREIGN KEY (disco_id)
        REFERENCES discos(id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
);
