import { Pool } from 'pg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuración de conexión
const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'sistema_estudiantil',
  password: process.env.DB_PASSWORD || 'password',
  port: parseInt(process.env.DB_PORT || '5432'),
});

async function setupDatabase() {
  try {
    console.log('🗑️  Eliminando tablas existentes...');
    const dropScript = fs.readFileSync(path.join(__dirname, 'drop_tables.sql'), 'utf8');
    await pool.query(dropScript);
    
    console.log('🏗️  Creando nuevas tablas...');
    const createScript = fs.readFileSync(path.join(__dirname, 'create_tables.sql'), 'utf8');
    await pool.query(createScript);
    
    console.log('🌱 Insertando datos iniciales...');
    const seedScript = fs.readFileSync(path.join(__dirname, 'seed_data.sql'), 'utf8');
    await pool.query(seedScript);
    
    console.log('✅ Base de datos configurada correctamente!');
    console.log('📝 Datos de prueba insertados:');
    console.log('   - Usuarios: joaquin.navarro, raimundo.farfan');
    console.log('   - Mensaje de prueba: "Hola" de Joaquín a Raimundo');
    
  } catch (error) {
    console.error('❌ Error configurando la base de datos:', error);
  } finally {
    await pool.end();
  }
}

setupDatabase();