-- 1. Crear base de datos y usarla
CREATE DATABASE IF NOT EXISTS `task_manager`;
USE `task_manager`;

-- 2. Crear tabla de usuarios
CREATE TABLE IF NOT EXISTS `users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `surname` VARCHAR(255) NOT NULL
);

-- 3. Crear tabla de tareas (necesaria por la foreign key)
CREATE TABLE IF NOT EXISTS `tasks` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `description` TEXT,
  `start_date` DATETIME NOT NULL,
  `end_date` DATETIME NOT NULL,
  `completed` BOOLEAN NOT NULL DEFAULT FALSE,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
);

-- 4. Insertar el usuario por defecto
-- El hash corresponde a la contraseña 'password'
INSERT INTO `users` (`email`, `password`, `name`, `surname`) 
VALUES ('admin@example.com', '$2y$10$w4rB185.BvD/IqR/bJvL9OMnC4E7L12h5B81G0YqK4Nn8t1r.Y6e2', 'Admin', 'User');
