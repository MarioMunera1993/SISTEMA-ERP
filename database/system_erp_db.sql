CREATE DATABASE IF NOT EXISTS system_erp_db;
USE system_erp_db;

-- 1. Tablas de Catálogo (Sin dependencias externas)
CREATE TABLE IF NOT EXISTS roles (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(20) NOT NULL UNIQUE,
    description VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS branches (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    location VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS equipment_statuses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS equipment_types (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

-- 2. Tabla de Usuarios (Depende de roles)
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    role_id BIGINT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_user_role FOREIGN KEY (role_id) REFERENCES roles(id)
);

-- 3. Tabla de Computadores (Depende de catálogos)
CREATE TABLE IF NOT EXISTS computers (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    serial_number VARCHAR(255) NOT NULL UNIQUE,
    brand VARCHAR(255) NOT NULL,
    model VARCHAR(255) NOT NULL,
    processor VARCHAR(255) NOT NULL,
    mac_lan VARCHAR(255),
    mac_wifi VARCHAR(255),
    team_number VARCHAR(255) NOT NULL UNIQUE,
    responsible_person VARCHAR(255),
    type_id INT,
    status_id INT,
    branch_id INT,
    purchase_date DATE,
    admission_date DATE,
    update_date DATE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at DATETIME,
    updated_at DATETIME,
    CONSTRAINT fk_comp_type FOREIGN KEY (type_id) REFERENCES equipment_types(id),
    CONSTRAINT fk_comp_status FOREIGN KEY (status_id) REFERENCES equipment_statuses(id),
    CONSTRAINT fk_comp_branch FOREIGN KEY (branch_id) REFERENCES branches(id)
);

-- 4. Tablas de Componentes (Dependen de computers)
CREATE TABLE IF NOT EXISTS ram_memories (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    brand VARCHAR(255) NOT NULL,
    model VARCHAR(255) NOT NULL,
    capacity VARCHAR(255) NOT NULL,
    type VARCHAR(255) NOT NULL,
    speed VARCHAR(100),
    serial_number VARCHAR(255) UNIQUE,
    computer_id BIGINT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at DATETIME,
    updated_at DATETIME,
    CONSTRAINT fk_ram_computer FOREIGN KEY (computer_id) REFERENCES computers(id)
);

CREATE TABLE IF NOT EXISTS storage_devices (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    brand VARCHAR(255) NOT NULL,
    model VARCHAR(255) NOT NULL,
    capacity VARCHAR(255) NOT NULL,
    type VARCHAR(255) NOT NULL,
    observations TEXT,
    serial_number VARCHAR(255) UNIQUE,
    computer_id BIGINT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at DATETIME,
    updated_at DATETIME,
    CONSTRAINT fk_storage_computer FOREIGN KEY (computer_id) REFERENCES computers(id)
);

-- 5. Tabla de Impresoras (Depende de catálogos)
CREATE TABLE IF NOT EXISTS printers (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    brand VARCHAR(255) NOT NULL,
    model VARCHAR(255) NOT NULL,
    consumable VARCHAR(255),
    printer_number VARCHAR(255) NOT NULL UNIQUE,
    serial_number VARCHAR(255) NOT NULL UNIQUE,
    type_id INT,
    is_color BOOLEAN,
    branch_id INT,
    responsible_person VARCHAR(255) NOT NULL,
    ip VARCHAR(255) NOT NULL,
    purchase_date DATE,
    created_at DATE,
    updated_at DATE,
    status_id INT,
    CONSTRAINT fk_printer_branch FOREIGN KEY (branch_id) REFERENCES branches(id)
);

-- 6. Inserción de Datos Iniciales
INSERT IGNORE INTO roles (name, description) VALUES 
('ADMIN', 'Administrador total del sistema'),
('OPERATOR', 'Operador con permisos limitados');

INSERT IGNORE INTO equipment_statuses (name) VALUES 
('En Uso'), ('En Bodega'), ('Dañado'), ('En Reparación');

INSERT IGNORE INTO equipment_types (name) VALUES 
('Portátil'), ('Escritorio'), ('Servidor');

-- Limpiar usuario admin previo para asegurar contraseña actualizada
DELETE FROM users WHERE username = 'admin';

-- Insertar usuario admin con contraseña '123456' (hash BCrypt)
-- Hash: $2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36LrvWyE
INSERT INTO users (username, password, full_name, email, role_id, is_active) 
VALUES (
    'admin', 
    '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36LrvWyE', 
    'Administrador Roldan', 
    'admin@roldan.com', 
    1, 
    1
);
