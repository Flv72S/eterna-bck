import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';

// Carica le variabili d'ambiente
dotenv.config();

const app = express();
const port = process.env.PORT || 3010;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));

// Log delle richieste
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  console.log('Body:', req.body);
  next();
});

// Routes
app.use('/api/auth', authRoutes);

// Route di test
app.get('/', (req, res) => {
  res.json({ message: 'Benvenuto su ETERNÀ Core API!' });
});

// Avvia il server
app.listen(port, () => {
  console.log(`Server in esecuzione su http://localhost:${port}`);
}); 