import express, { Request, Response } from 'express';
import { db } from './db';
import { users } from './db/schema';
import { eq } from 'drizzle-orm';

const app = express();
const port = 3000;

// Middleware per il parsing del JSON
app.use(express.json());

// Endpoint per testare la connessione al database
app.get('/test-db', async (req: Request, res: Response) => {
  try {
    const result = await db.select().from(users);
    res.json({ success: true, users: result });
  } catch (error: unknown) {
    console.error('Errore nel test del database:', error);
    res.status(500).json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Errore sconosciuto' 
    });
  }
});

// Endpoint per ottenere tutti gli utenti
app.get('/users', async (req: Request, res: Response) => {
  try {
    const allUsers = await db.select().from(users);
    res.json(allUsers);
  } catch (error: unknown) {
    console.error('Errore nel recupero degli utenti:', error);
    res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Errore sconosciuto' 
    });
  }
});

// Endpoint per ottenere un utente specifico
app.get('/users/:id', async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id);
    if (isNaN(userId)) {
      return res.status(400).json({ error: 'ID utente non valido' });
    }

    const user = await db.select().from(users).where(eq(users.id, userId));
    
    if (user.length === 0) {
      return res.status(404).json({ error: 'Utente non trovato' });
    }

    res.json(user[0]);
  } catch (error: unknown) {
    console.error('Errore nel recupero dell\'utente:', error);
    res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Errore sconosciuto' 
    });
  }
});

// Avvio del server
app.listen(port, () => {
  console.log(`Server in ascolto sulla porta ${port}`);
}); 