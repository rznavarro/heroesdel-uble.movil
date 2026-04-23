-- Script para crear todas las tablas del sistema
-- Base de datos para sistema de guías y chat estudiantil

-- Crear tipos enum
CREATE TYPE guide_status AS ENUM ('PENDING', 'RESOLVED', 'READ');
CREATE TYPE note_tag AS ENUM ('GENERAL', 'URGENTE', 'RECORDATORIO', 'EVENTO');

-- Tabla de usuarios (para manejar sesiones)
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    code VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    last_login TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de guías
CREATE TABLE guides (
    id SERIAL PRIMARY KEY,
    code VARCHAR(20) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    category VARCHAR(100) NOT NULL,
    status guide_status DEFAULT 'PENDING',
    created_by VARCHAR(50) REFERENCES users(code),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de notas/anuncios
CREATE TABLE notes (
    id SERIAL PRIMARY KEY,
    code VARCHAR(20) UNIQUE NOT NULL,
    tag note_tag DEFAULT 'GENERAL',
    text TEXT NOT NULL,
    created_by VARCHAR(50) REFERENCES users(code),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP,
    is_active BOOLEAN DEFAULT true
);

-- Tabla de mensajes de chat
CREATE TABLE chat_messages (
    id SERIAL PRIMARY KEY,
    from_code VARCHAR(50) NOT NULL REFERENCES users(code),
    from_name VARCHAR(100) NOT NULL,
    to_code VARCHAR(50) REFERENCES users(code), -- NULL para mensajes grupales
    text TEXT,
    image_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_read BOOLEAN DEFAULT false,
    
    -- Validación: debe tener texto o imagen
    CONSTRAINT check_message_content CHECK (
        (text IS NOT NULL AND LENGTH(TRIM(text)) > 0) OR 
        (image_url IS NOT NULL AND LENGTH(TRIM(image_url)) > 0)
    )
);

-- Índices para mejorar rendimiento
CREATE INDEX idx_chat_messages_from_code ON chat_messages(from_code);
CREATE INDEX idx_chat_messages_to_code ON chat_messages(to_code);
CREATE INDEX idx_chat_messages_created_at ON chat_messages(created_at);
CREATE INDEX idx_guides_status ON guides(status);
CREATE INDEX idx_guides_category ON guides(category);
CREATE INDEX idx_notes_active ON notes(is_active);
CREATE INDEX idx_users_code ON users(code);

-- Triggers para actualizar timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_guides_updated_at 
    BEFORE UPDATE ON guides 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();