import express from 'express';
import { db, testConnection } from './db';
import * as schema from './db/schema';
import { eq } from 'drizzle-orm';

const app = express();
const port = 3000;

// Middleware per il parsing del JSON
app.use(express.json());

// Endpoint per testare la connessione al database
app.get('/test-db', async (req, res) => {
  try {
    const users = await testConnection();
    res.json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Endpoint per ottenere tutti gli utenti
app.get('/users', async (req, res) => {
  try {
    const users = await db.select().from(schema.users);
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint per ottenere un utente specifico
app.get('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await db
      .select()
      .from(schema.users)
      .where(eq(schema.users.id, id))
      .limit(1);

    if (user.length === 0) {
      return res.status(404).json({ error: 'Utente non trovato' });
    }

    res.json(user[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Avvio del server
app.listen(port, () => {
  console.log(`Server in ascolto sulla porta ${port}`);
}); 