import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Carica le variabili d'ambiente
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Route di test
app.get('/', (req, res) => {
  res.json({ message: 'Benvenuto su ETERNÀ Core API!' });
});

// Avvia il server
app.listen(port, () => {
  console.log(`Server in esecuzione su http://localhost:${port}`);
}); 