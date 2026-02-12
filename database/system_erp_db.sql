CREATE DATABASE system_erp_db;

use system_erp_db;


CREATE TABLE roles (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(20) NOT NULL UNIQUE, -- Ej: ADMIN, OPERATOR
    description VARCHAR(255)
);

-- Insertamos roles básicos
INSERT INTO roles (name, description) VALUES ('ADMIN', 'Administrador total del sistema');
INSERT INTO roles (name, description) VALUES ('OPERATOR', 'Operador con permisos limitados');

Select * from roles;

CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL, -- Aquí guardaremos el hash de la clave
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    role_id BIGINT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_user_role FOREIGN KEY (role_id) REFERENCES roles(id)
);

INSERT INTO users (username, password, full_name, email, role_id) 
VALUES ('admin', '123456', 'Administrador Sistema', 'admin@erp.com', 1);

select * from users;

USE system_erp_db;

-- Primero borramos por si acaso
DELETE FROM users WHERE username = 'admin';


-- Insertamos con el hash CORRECTO (60 caracteres) para '123456'
INSERT INTO users (username, password, full_name, email, role_id, is_active) 
VALUES (
    'admin', 
    '$2a$10$8.06qKPTn5OMuyIdUq3tiOT8vz8G9t.W1t8fX0e.Y8uD1tW8vzVTu', 
    'Administrador Roldan', 
    'admin@roldan.com', 
    1, 
    1
);

USE system_erp_db;
DELETE FROM users WHERE username = 'admin';
INSERT INTO users (username, password, full_name, email, role_id, is_active) 
VALUES ('admin', '$2a$10$EqXU6Nid5n/YF7eXv2O7XOfbYpEXO8V/LHYy6G.G8H5U1tN8vVTu', 'Administrador Roldan', 'admin@roldan.com', 1, 1);