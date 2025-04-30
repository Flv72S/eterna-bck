import express, { Request, Response, NextFunction } from 'express';
import { db } from './db';
import { users } from './db/schema';
import { eq } from 'drizzle-orm';
import cors from 'cors';
import { errorHandler } from './middleware/errorHandler';
import authRoutes from './routes/auth';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Endpoint per testare la connessione al database
app.get('/test-db', (req, res, next) => {
  void db.select().from(users)
    .then(result => {
      res.json({ success: true, users: result });
    })
    .catch(next);
});

// Endpoint per ottenere tutti gli utenti
app.get('/users', (req, res, next) => {
  void db.select().from(users)
    .then(allUsers => {
      res.json(allUsers);
    })
    .catch(next);
});

// Endpoint per ottenere un utente specifico
app.get('/users/:id', (req, res, next) => {
  const userId = req.params.id;
  if (!userId) {
    return res.status(400).json({ error: 'ID utente non valido' });
  }

  void db.select().from(users).where(eq(users.id, userId))
    .then(user => {
      if (user.length === 0) {
        return res.status(404).json({ error: 'Utente non trovato' });
      }
      res.json(user[0]);
    })
    .catch(next);
});

app.use('/api/auth', authRoutes);

app.use(errorHandler);

// Avvio del server
app.listen(port, () => {
  console.log(`Server in ascolto sulla porta ${port}`);
});

export default app; 