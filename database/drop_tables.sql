-- Script para eliminar todas las tablas existentes
-- Ejecutar con precaución: esto eliminará todos los datos

DROP TABLE IF EXISTS chat_messages CASCADE;
DROP TABLE IF EXISTS notes CASCADE;
DROP TABLE IF EXISTS guides CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Eliminar tipos enum si existen
DROP TYPE IF EXISTS guide_status CASCADE;
DROP TYPE IF EXISTS note_tag CASCADE;