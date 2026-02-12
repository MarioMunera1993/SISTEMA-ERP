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


-- Modificamos la tabla users para que use role_id
ALTER TABLE users DROP COLUMN role;
ALTER TABLE users ADD COLUMN role_id BIGINT;
ALTER TABLE users ADD CONSTRAINT fk_user_role FOREIGN KEY (role_id) REFERENCES roles(id);