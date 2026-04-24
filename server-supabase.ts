import express from "express";
import { createServer as createViteServer } from "vite";
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from "path";
import path from "path";

dotenv.config();

// Supabase configuration
const supabaseUrl = process.env.VITE_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || process.env.VITE_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Serve static files from Downloads folder
  app.use('/downloads', express.static('C:/Users/ASUS/Downloads'));

  // API Routes
  app.get("/api/data", async (req, res) => {
    try {
      const [guidesResult, notesResult] = await Promise.all([
        supabase.from('guides').select('*').order('created_at', { ascending: false }),
        supabase.from('notes').select('*').where('is_active', 'eq', true).order('created_at', { ascending: false })
      ]);

      res.json({
        guides: guidesResult.data || [],
        notes: notesResult.data || [],
        chat_messages: [] // Se maneja por separado
      });
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Error fetching data' });
    }
  });

  app.post("/api/guides", async (req, res) => {
    try {
      const { data, error } = await supabase
        .from('guides')
        .insert([{
          code: `G${Date.now()}`,
          title: req.body.title,
          category: req.body.category,
          status: req.body.status || 'PENDING',
          content: req.body.content,
          created_by: req.body.created_by
        }])
        .select()
        .single();

      if (error) throw error;
      res.status(201).json(data);
    } catch (error) {
      console.error('Error creating guide:', error);
      res.status(500).json({ error: 'Error creating guide' });
    }
  });

  app.post("/api/notes", async (req, res) => {
    try {
      const { data, error } = await supabase
        .from('notes')
        .insert([{
          code: `N${Date.now()}`,
          tag: req.body.tag || 'GENERAL',
          text: req.body.text,
          created_by: req.body.created_by
        }])
        .select()
        .single();

      if (error) throw error;
      res.status(201).json(data);
    } catch (error) {
      console.error('Error creating note:', error);
      res.status(500).json({ error: 'Error creating note' });
    }
  });

  app.delete("/api/notes/:id", async (req, res) => {
    try {
      const { error } = await supabase
        .from('notes')
        .update({ is_active: false })
        .eq('id', req.params.id);

      if (error) throw error;
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting note:', error);
      res.status(500).json({ error: 'Error deleting note' });
    }
  });

  // CHAT ENDPOINTS - AQUÍ ESTÁ LA MAGIA
  app.get("/api/chat-messages", async (req, res) => {
    try {
      const fromCode = String(req.query.from_code || "");
      const withCode = String(req.query.with_code || "");
      const isGroup = String(req.query.group || "false") === "true";

      let query = supabase.from('chat_messages').select('*');

      if (isGroup) {
        // Mensajes grupales (to_code es null)
        query = query.is('to_code', null);
      } else if (fromCode && withCode) {
        // Mensajes privados entre dos usuarios
        query = query.or(`and(from_code.eq.${fromCode},to_code.eq.${withCode}),and(from_code.eq.${withCode},to_code.eq.${fromCode})`);
      }

      const { data, error } = await query
        .order('created_at', { ascending: true })
        .limit(200);

      if (error) throw error;
      res.json(data || []);
    } catch (error) {
      console.error('Error fetching messages:', error);
      res.status(500).json({ error: 'Error fetching messages' });
    }
  });

  app.post("/api/chat-messages", async (req, res) => {
    try {
      const { from_code, from_name, to_code, text, image_url } = req.body || {};

      if (!from_code || !from_name) {
        return res.status(400).json({ error: "from_code y from_name son requeridos" });
      }

      if ((!text || String(text).trim() === "") && !image_url) {
        return res.status(400).json({ error: "El mensaje no puede estar vacío" });
      }

      const { data, error } = await supabase
        .from('chat_messages')
        .insert([{
          from_code,
          from_name,
          to_code: to_code || null,
          text: text ? String(text) : null,
          image_url: image_url || null
        }])
        .select()
        .single();

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      console.log('Mensaje guardado exitosamente:', data);
      res.status(201).json(data);
    } catch (error) {
      console.error('Error saving message:', error);
      res.status(500).json({ error: 'Error saving message' });
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
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📡 Connected to Supabase: ${supabaseUrl}`);
  });
}

startServer().catch(console.error);