-- Script para insertar datos iniciales de prueba
-- Migración de datos del sistema JSON actual

-- Insertar usuarios de ejemplo
INSERT INTO users (code, name, email) VALUES 
('joaquin.navarro', 'Joaquín Navarro', 'joaquin.navarro@estudiante.cl'),
('raimundo.farfan', 'Raimundo Farfán', 'raimundo.farfan@estudiante.cl'),
('admin', 'Administrador', 'admin@colegio.cl');

-- Insertar guías existentes
INSERT INTO guides (code, title, category, status, created_by) VALUES 
('g1', 'Guía de Álgebra I: Ecuaciones', 'MATEMÁTICAS PAES', 'PENDING', 'admin'),
('g2', 'Guía de Comprensión Lectora: Textos Científicos', 'LENGUAJE PAES', 'RESOLVED', 'admin'),
('g3', 'Historia de Chile: La Independencia', 'HISTORIA', 'READ', 'admin');

-- Insertar notas existentes
INSERT INTO notes (code, tag, text, created_by) VALUES 
('n1', 'GENERAL', 'Recuerden que la prueba de suficiencia física es el próximo viernes. Traer ropa deportiva.', 'admin');

-- Insertar mensaje de ejemplo (Joaquín a Raimundo)
INSERT INTO chat_messages (from_code, from_name, to_code, text) VALUES 
('joaquin.navarro', 'Joaquín Navarro', 'raimundo.farfan', 'Hola');