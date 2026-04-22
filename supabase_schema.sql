-- ============================================================
-- PREUNIVERSITARIO LOS HÉROES DE ÑUBLE — Supabase Schema
-- Versión: 2.0.0
-- Descripción: Esquema completo para la base de datos en Supabase
--              basado en los tipos de datos del sistema V.O.R.T.E.X
-- ============================================================

-- Habilitar extensión UUID (viene activada por defecto en Supabase)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- ENUM TYPES
-- ============================================================

-- Instituciones objetivo
CREATE TYPE institution_type AS ENUM (
  'NAVY',
  'AIR_FORCE',
  'ARMY',
  'PDI',
  'CARABINEROS',
  'GOPE',
  'SPECIALTIES'
);

-- Meta académica del postulante
CREATE TYPE academic_goal_type AS ENUM (
  'PAES_WINTER',
  'PAES_REGULAR',
  'INTERNAL'
);

-- Estado de las guías
CREATE TYPE guide_status AS ENUM (
  'PENDING',
  'RESOLVED',
  'READ'
);

-- Tipo de prueba física
CREATE TYPE physical_test_type AS ENUM (
  '2400m',
  '3000m'
);


-- ============================================================
-- TABLA: user_profiles
-- Perfil principal de cada postulante
-- ============================================================
CREATE TABLE IF NOT EXISTS user_profiles (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code          TEXT NOT NULL UNIQUE,           -- Ej: VX-01, VX-02
  name          TEXT NOT NULL,
  target_institution  institution_type NOT NULL,
  academic_goal academic_goal_type NOT NULL,
  
  -- Metas físicas (embebidas como columnas por simplicidad)
  goal_run_2400m  TEXT,   -- Formato MM:SS
  goal_run_3000m  TEXT,   -- Formato MM:SS
  goal_pushups    INTEGER DEFAULT 0,
  goal_situps     INTEGER DEFAULT 0,

  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE user_profiles IS 'Perfil base de cada postulante del preuniversitario.';
COMMENT ON COLUMN user_profiles.code IS 'Código único de acceso del postulante (ej: VX-01).';


-- ============================================================
-- TABLA: profile_subjects
-- Materias prioritarias por postulante (relación 1:N)
-- ============================================================
CREATE TABLE IF NOT EXISTS profile_subjects (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id  UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  subject     TEXT NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE profile_subjects IS 'Materias de prioridad para cada postulante.';


-- ============================================================
-- TABLA: guides
-- Guías académicas compartidas (globales o por perfil)
-- ============================================================
CREATE TABLE IF NOT EXISTS guides (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id  UUID REFERENCES user_profiles(id) ON DELETE SET NULL, -- NULL = global
  title       TEXT NOT NULL,
  category    TEXT NOT NULL,
  status      guide_status NOT NULL DEFAULT 'PENDING',
  file_url    TEXT,           -- URL del archivo (Supabase Storage o externo)
  date        DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE guides IS 'Guías académicas del preuniversitario. profile_id NULL = guía global para todos.';
COMMENT ON COLUMN guides.file_url IS 'URL del PDF o recurso. Puede ser un link de Supabase Storage.';


-- ============================================================
-- TABLA: notes
-- Notas o avisos del sistema (globales o por perfil)
-- ============================================================
CREATE TABLE IF NOT EXISTS notes (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id  UUID REFERENCES user_profiles(id) ON DELETE SET NULL, -- NULL = global
  tag         TEXT NOT NULL,      -- Etiqueta de la nota (ej: "AVISO", "TAREA", "RECORDATORIO")
  text        TEXT NOT NULL,
  date        DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE notes IS 'Notas o avisos del sistema. profile_id NULL = nota global.';


-- ============================================================
-- TABLA: physical_records
-- Historial de rendimiento físico por postulante
-- ============================================================
CREATE TABLE IF NOT EXISTS physical_records (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id  UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  type        physical_test_type NOT NULL,
  time        TEXT NOT NULL,       -- Formato MM:SS
  score       TEXT,                -- Nota calculada (ej: "6.5")
  date        DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE physical_records IS 'Registro de marcas físicas (carreras) por postulante.';


-- ============================================================
-- TABLA: academic_scores
-- Calificaciones académicas por materia
-- ============================================================
CREATE TABLE IF NOT EXISTS academic_scores (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id  UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  subject     TEXT NOT NULL,       -- Nombre de la materia
  score       NUMERIC(4, 1) NOT NULL CHECK (score >= 1.0 AND score <= 7.0),
  date        DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE academic_scores IS 'Notas académicas de cada postulante por materia.';


-- ============================================================
-- TRIGGERS: Auto-actualizar updated_at
-- ============================================================

-- Función genérica para actualizar timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para user_profiles
CREATE TRIGGER trg_user_profiles_updated_at
  BEFORE UPDATE ON user_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Trigger para guides
CREATE TRIGGER trg_guides_updated_at
  BEFORE UPDATE ON guides
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();


-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- Habilitar para mayor seguridad en producción
-- ============================================================

-- Habilitar RLS en todas las tablas
ALTER TABLE user_profiles    ENABLE ROW LEVEL SECURITY;
ALTER TABLE profile_subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE guides            ENABLE ROW LEVEL SECURITY;
ALTER TABLE notes             ENABLE ROW LEVEL SECURITY;
ALTER TABLE physical_records  ENABLE ROW LEVEL SECURITY;
ALTER TABLE academic_scores   ENABLE ROW LEVEL SECURITY;

-- POLÍTICA TEMPORAL: Acceso público (ajustar en producción)
-- Permite leer y escribir sin autenticación por ahora.
-- Reemplazar con políticas basadas en auth.uid() cuando integres Supabase Auth.

CREATE POLICY "Lectura publica" ON user_profiles    FOR SELECT USING (true);
CREATE POLICY "Lectura publica" ON profile_subjects FOR SELECT USING (true);
CREATE POLICY "Lectura publica" ON guides            FOR SELECT USING (true);
CREATE POLICY "Lectura publica" ON notes             FOR SELECT USING (true);
CREATE POLICY "Lectura publica" ON physical_records  FOR SELECT USING (true);
CREATE POLICY "Lectura publica" ON academic_scores   FOR SELECT USING (true);

CREATE POLICY "Escritura publica" ON user_profiles    FOR INSERT WITH CHECK (true);
CREATE POLICY "Escritura publica" ON profile_subjects FOR INSERT WITH CHECK (true);
CREATE POLICY "Escritura publica" ON guides            FOR INSERT WITH CHECK (true);
CREATE POLICY "Escritura publica" ON notes             FOR INSERT WITH CHECK (true);
CREATE POLICY "Escritura publica" ON physical_records  FOR INSERT WITH CHECK (true);
CREATE POLICY "Escritura publica" ON academic_scores   FOR INSERT WITH CHECK (true);

CREATE POLICY "Update publica" ON user_profiles    FOR UPDATE USING (true);
CREATE POLICY "Update publica" ON guides            FOR UPDATE USING (true);


-- ============================================================
-- DATOS INICIALES (SEED)
-- Los 13 postulantes del sistema
-- ============================================================

INSERT INTO user_profiles (code, name, target_institution, academic_goal, goal_run_2400m, goal_run_3000m, goal_pushups, goal_situps) VALUES
  ('VX-01', 'Joaquin Navarro',     'AIR_FORCE',   'PAES_REGULAR', '09:40', '12:10', 45, 55),
  ('VX-02', 'Raimundo Farfan',     'AIR_FORCE',   'PAES_REGULAR', '09:30', '12:00', 50, 60),
  ('VX-03', 'Jose Tomas',          'PDI',          'INTERNAL',     '10:00', '12:30', 40, 50),
  ('VX-04', 'Abiel',               'PDI',          'INTERNAL',     '10:15', '12:45', 42, 52),
  ('VX-05', 'Ashly Castro',        'PDI',          'INTERNAL',     '10:30', '13:00', 35, 45),
  ('VX-06', 'Sofia Osses',         'PDI',          'PAES_REGULAR', '09:50', '12:20', 45, 55),
  ('VX-07', 'Ioani',               'GOPE',         'INTERNAL',     '09:00', '11:20', 65, 70),
  ('VX-08', 'Vicente Guajardo',    'NAVY',         'PAES_REGULAR', '09:20', '11:50', 50, 60),
  ('VX-09', 'Joaquin Abarca',      'NAVY',         'PAES_REGULAR', '09:25', '11:55', 52, 62),
  ('VX-10', 'Marcelo Carcamo',     'AIR_FORCE',   'PAES_REGULAR', '09:40', '12:10', 45, 55),
  ('VX-11', 'Francisco Muñoz',     'PDI',          'INTERNAL',     '10:00', '12:30', 40, 50),
  ('VX-12', 'Cristian',            'ARMY',         'PAES_REGULAR', '09:30', '12:00', 48, 58),
  ('VX-13', 'Postulante Invitado', 'SPECIALTIES',  'INTERNAL',     '10:30', '13:00', 35, 45)
ON CONFLICT (code) DO NOTHING;

-- Materias prioritarias
INSERT INTO profile_subjects (profile_id, subject)
SELECT p.id, s.subject FROM user_profiles p
CROSS JOIN (VALUES
  ('VX-01', 'Matemáticas'), ('VX-01', 'Física'), ('VX-01', 'Especialidades'),
  ('VX-02', 'Matemáticas'), ('VX-02', 'Historia'), ('VX-02', 'Vida Castrense'),
  ('VX-03', 'Lenguaje'),    ('VX-03', 'Actualidad'), ('VX-03', 'Inglés'),
  ('VX-04', 'Psicología'),  ('VX-04', 'Lenguaje'),
  ('VX-05', 'Lenguaje'),    ('VX-05', 'Psicología'), ('VX-05', 'Entrevista'),
  ('VX-06', 'Historia'),    ('VX-06', 'Matemáticas'), ('VX-06', 'Naval'),
  ('VX-07', 'Fuerza'),      ('VX-07', 'Resistencia'), ('VX-07', 'Psicología'),
  ('VX-08', 'Historia Naval'), ('VX-08', 'Matemáticas'),
  ('VX-09', 'Matemáticas'), ('VX-09', 'Historia'), ('VX-09', 'Física'),
  ('VX-10', 'Física'),      ('VX-10', 'Inglés'), ('VX-10', 'Matemáticas'),
  ('VX-11', 'Lenguaje'),    ('VX-11', 'Psicología'), ('VX-11', 'Actualidad'),
  ('VX-12', 'Historia'),    ('VX-12', 'Vida Castrense'), ('VX-12', 'Estrategia'),
  ('VX-13', 'Matemáticas'), ('VX-13', 'Inglés')
) AS s(code, subject)
WHERE p.code = s.code;


-- ============================================================
-- FIN DEL SCRIPT
-- ============================================================
