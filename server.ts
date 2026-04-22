import express from "express";
import { createServer as createViteServer } from "vite";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DB_FILE = path.join(__dirname, "db.json");

// Initial DB structure
const initialDB = {
  guides: [
    { id: "g1", title: "Guía de Álgebra I: Ecuaciones", date: "24/04/2026", status: "PENDING", category: "MATEMÁTICAS PAES" },
    { id: "g2", title: "Guía de Comprensión Lectora: Textos Científicos", date: "22/04/2026", status: "RESOLVED", category: "LENGUAJE PAES" },
    { id: "g3", title: "Historia de Chile: La Independencia", date: "20/04/2026", status: "READ", category: "HISTORIA" }
  ],
  notes: [
    { id: "n1", tag: "GENERAL", text: "Recuerden que la prueba de suficiencia física es el próximo viernes. Traer ropa deportiva.", date: "22/04/2026" }
  ]
};

// Ensure DB exists
if (!fs.existsSync(DB_FILE)) {
  fs.writeFileSync(DB_FILE, JSON.stringify(initialDB, null, 2));
}

function getDB() {
  return JSON.parse(fs.readFileSync(DB_FILE, "utf-8"));
}

function saveDB(data: any) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/data", (req, res) => {
    res.json(getDB());
  });

  app.post("/api/guides", (req, res) => {
    const db = getDB();
    const newGuide = { ...req.body, id: Math.random().toString(36).substr(2, 9) };
    db.guides.unshift(newGuide);
    saveDB(db);
    res.status(201).json(newGuide);
  });

  app.post("/api/notes", (req, res) => {
    const db = getDB();
    const newNote = { ...req.body, id: Math.random().toString(36).substr(2, 9) };
    db.notes.unshift(newNote);
    saveDB(db);
    res.status(201).json(newNote);
  });

  app.delete("/api/notes/:id", (req, res) => {
    const db = getDB();
    db.notes = db.notes.filter((n: any) => n.id !== req.params.id);
    saveDB(db);
    res.status(204).send();
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
