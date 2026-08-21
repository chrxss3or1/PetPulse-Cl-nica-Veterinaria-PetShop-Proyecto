CREATE DATABASE IF NOT EXISTS petpulse DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE petpulse;

-- 1. TABLA USUARIOS
CREATE TABLE IF NOT EXISTS usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  rol ENUM('cliente', 'veterinario', 'admin') DEFAULT 'cliente',
  estado ENUM('Activo', 'Inactivo') DEFAULT 'Activo', 
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. TABLA MASCOTAS
CREATE TABLE IF NOT EXISTS mascotas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT NULL,
  nombre VARCHAR(100) NOT NULL,
  especie VARCHAR(50) NOT NULL,
  edad INT DEFAULT 0,
  foto VARCHAR(255) NULL,
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE SET NULL
);

-- 3. TABLA CITAS
CREATE TABLE IF NOT EXISTS citas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  mascota_nombre VARCHAR(100) NOT NULL,
  propietario_nombre VARCHAR(100) DEFAULT 'Propietario',
  servicio VARCHAR(100) NOT NULL,
  prioridad VARCHAR(50) DEFAULT 'Verde',
  fecha DATE NOT NULL,
  hora TIME NOT NULL,
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. TABLA TRIAJES
CREATE TABLE IF NOT EXISTS triajes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  mascota VARCHAR(100) NOT NULL,
  nivel VARCHAR(50) NOT NULL,
  puntaje INT NOT NULL,
  fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. TABLA PRODUCTOS
CREATE TABLE IF NOT EXISTS productos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  categoria VARCHAR(50) NOT NULL,
  precio DECIMAL(10,2) NOT NULL,
  stock INT DEFAULT 0,
  imagen VARCHAR(255) NULL
);

-- 6. TABLA RECETAS
CREATE TABLE IF NOT EXISTS recetas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  mascota VARCHAR(100) NOT NULL,
  diagnostico TEXT NOT NULL,
  tratamiento TEXT NOT NULL,
  receta TEXT NOT NULL,
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 7. TABLA PEDIDOS
CREATE TABLE IF NOT EXISTS pedidos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  total DECIMAL(10,2) NOT NULL,
  metodo_pago VARCHAR(50) DEFAULT 'tarjeta',
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


INSERT INTO usuarios (nombre, email, password, rol, estado) VALUES
('Administrador PetPulse', 'admin@petpulse.com', '$2y$10$e.w2p9Z9JkXq1aM8e/e/9eY1.uA7Z.J3H/Xw8XjO4dE8O8O8O8O8O', 'admin', 'Activo'),
('Dra. Valeria Mora', 'valeria.mora@petpulse.com', '$2y$10$e.w2p9Z9JkXq1aM8e/e/9eY1.uA7Z.J3H/Xw8XjO4dE8O8O8O8O8O', 'veterinario', 'Activo'),
('Dr. Carlos Delgado', 'carlos.delgado@petpulse.com', '$2y$10$e.w2p9Z9JkXq1aM8e/e/9eY1.uA7Z.J3H/Xw8XjO4dE8O8O8O8O8O', 'veterinario', 'Activo'),
('Dra. Ana Castro', 'ana.castro@petpulse.com', '$2y$10$e.w2p9Z9JkXq1aM8e/e/9eY1.uA7Z.J3H/Xw8XjO4dE8O8O8O8O8O', 'veterinario', 'Activo')
ON DUPLICATE KEY UPDATE nombre = VALUES(nombre);