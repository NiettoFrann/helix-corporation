SET NAMES utf8mb4;

CREATE DATABASE IF NOT EXISTS portal CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE portal;

CREATE TABLE empleados (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  usuario       VARCHAR(64)  NOT NULL UNIQUE,
  nombre        VARCHAR(64)  NOT NULL,
  apellido      VARCHAR(64)  NOT NULL,
  area          VARCHAR(64)  NOT NULL,
  email         VARCHAR(128) NOT NULL,
  telefono      VARCHAR(32)  NOT NULL,
  password_hash CHAR(32)     NOT NULL
);

INSERT INTO empleados (usuario, nombre, apellido, area, email, telefono, password_hash) VALUES
  ('marcus.voss',      'Marcus',   'Voss',      'Dirección General',  'marcus.voss@helixcorp.com',      '+54 11 4000-0001', MD5('password1')),
  ('elena.cross',      'Elena',    'Cross',     'Seguridad (CISO)',   'elena.cross@helixcorp.com',      '+54 11 4000-0002', MD5('superman')),
  ('roberto.aguilar',  'Roberto',  'Aguilar',   'Finanzas (CFO)',     'roberto.aguilar@helixcorp.com',  '+54 11 4000-0003', MD5('qwerty123')),
  ('silvia.dominguez', 'Silvia',   'Domínguez', 'Recursos Humanos',   'silvia.dominguez@helixcorp.com', '+54 11 4000-0004', MD5('princess')),
  ('diego.ferreyra',   'Diego',    'Ferreyra',  'Sistemas',           'diego.ferreyra@helixcorp.com',   '+54 11 4000-0012', MD5('letmein')),
  ('laura.benitez',    'Laura',    'Benítez',   'Recursos Humanos',   'laura.benitez@helixcorp.com',    '+54 11 4000-0005', MD5('iloveyou')),
  ('pablo.sosa',       'Pablo',    'Sosa',      'Soporte',            'pablo.sosa@helixcorp.com',       '+54 11 4000-0006', MD5('football')),
  ('carla.mendez',     'Carla',    'Méndez',    'Comercial',          'carla.mendez@helixcorp.com',     '+54 11 4000-0007', MD5('sunshine')),
  ('nestor.rivas',     'Néstor',   'Rivas',     'Legal',              'nestor.rivas@helixcorp.com',     '+54 11 4000-0008', MD5('dragon'));

-- Cuenta que usa el portal para consultar la base (permisos acotados).
-- Se crea para socket (localhost) y TCP (127.0.0.1): el portal conecta por TCP.
CREATE USER IF NOT EXISTS 'portal_app'@'localhost' IDENTIFIED BY 'P0rtal_H3lix_2019';
CREATE USER IF NOT EXISTS 'portal_app'@'127.0.0.1' IDENTIFIED BY 'P0rtal_H3lix_2019';
GRANT SELECT ON portal.empleados TO 'portal_app'@'localhost';
GRANT SELECT ON portal.empleados TO 'portal_app'@'127.0.0.1';
FLUSH PRIVILEGES;
