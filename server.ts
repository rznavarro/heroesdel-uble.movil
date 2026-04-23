import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import pool from "./database/config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/data", async (req, res) => {
    try {
      const guidesResult = await pool.query('SELECT code as id, title, category, status, created_at as date FROM guides ORDER BY created_at DESC');
      const notesResult = await pool.query('SELECT code as id, tag, text, created_at as date FROM notes WHERE is_active = true ORDER BY created_at DESC');
      
      const guides = guidesResult.rows.map(guide => ({
        ...guide,
        date: new Date(guide.date).toLocaleDateString('es-CL')
      }));
      
      const notes = notesResult.rows.map(note => ({
        ...note,
        date: new Date(note.date).toLocaleDateString('es-CL')
      }));

      res.json({ guides, notes, chat_messages: [] });
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  });

  app.post("/api/guides", async (req, res) => {
    try {
      const { title, category, status = 'PENDING' } = req.body;
      const code = Math.random().toString(36).substr(2, 9);
      
      const result = await pool.query(
        'INSERT INTO guides (code, title, category, status, created_by) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [code, title, category, status, 'admin']
      );
      
      const newGuide = {
        id: result.rows[0].code,
        title: result.rows[0].title,
        category: result.rows[0].category,
        status: result.rows[0].status,
        date: new Date(result.rows[0].created_at).toLocaleDateString('es-CL')
      };
      
      res.status(201).json(newGuide);
    } catch (error) {
      console.error('Error creating guide:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  });

  app.post("/api/notes", async (req, res) => {
    try {
      const { tag = 'GENERAL', text } = req.body;
      const code = Math.random().toString(36).substr(2, 9);
      
      const result = await pool.query(
        'INSERT INTO notes (code, tag, text, created_by) VALUES ($1, $2, $3, $4) RETURNING *',
        [code, tag, text, 'admin']
      );
      
      const newNote = {
        id: result.rows[0].code,
        tag: result.rows[0].tag,
        text: result.rows[0].text,
        date: new Date(result.rows[0].created_at).toLocaleDateString('es-CL')
      };
      
      res.status(201).json(newNote);
    } catch (error) {
      console.error('Error creating note:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  });

  app.delete("/api/notes/:id", async (req, res) => {
    try {
      await pool.query('UPDATE notes SET is_active = false WHERE code = $1', [req.params.id]);
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting note:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  });

  app.get("/api/chat-messages", async (req, res) => {
    try {
      const fromCode = String(req.query.from_code || "");
      const withCode = String(req.query.with_code || "");
      const isGroup = String(req.query.group || "false") === "true";

      let query = 'SELECT * FROM chat_messages';
      let params: any[] = [];

      if (isGroup) {
        query += ' WHERE to_code IS NULL';
      } else if (fromCode && withCode) {
        query += ' WHERE (from_code = $1 AND to_code = $2) OR (from_code = $2 AND to_code = $1)';
        params = [fromCode, withCode];
      }

      query += ' ORDER BY created_at ASC LIMIT 200';

      const result = await pool.query(query, params);
      res.json(result.rows);
    } catch (error) {
      console.error('Error fetching chat messages:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  });

  app.post("/api/chat-messages", async (req, res) => {
    try {
      const { from_code, from_name, to_code, text, image_url } = req.body || {};

      if (!from_code || !from_name) {
        return res.status(400).json({ error: "from_code y from_name son requeridos" });
      }

      if ((text === null || text === undefined || String(text).trim() === "") && !image_url) {
        return res.status(400).json({ error: "El mensaje no puede estar vacío" });
      }

      // Asegurar que el usuario existe
      await pool.query(
        'INSERT INTO users (code, name) VALUES ($1, $2) ON CONFLICT (code) DO UPDATE SET last_login = CURRENT_TIMESTAMP',
        [from_code, from_name]
      );

      // Si hay destinatario, asegurar que también existe
      if (to_code) {
        const userExists = await pool.query('SELECT code FROM users WHERE code = $1', [to_code]);
        if (userExists.rows.length === 0) {
          return res.status(400).json({ error: "Usuario destinatario no encontrado" });
        }
      }

      const result = await pool.query(
        'INSERT INTO chat_messages (from_code, from_name, to_code, text, image_url) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [from_code, from_name, to_code || null, text || null, image_url || null]
      );

      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error('Error creating chat message:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  });

  // Vite integration
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
