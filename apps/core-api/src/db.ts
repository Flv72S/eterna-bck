import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './db/schema';

// Configurazione del pool di connessioni
const pool = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'N0nn0c4rl0!!',
  database: 'eterna_db',
});

// Creazione dell'istanza di Drizzle
export const db = drizzle(pool, { schema });

// Funzione per testare la connessione
export async function testConnection() {
  try {
    const result = await db.select().from(schema.users);
    console.log('Connessione al database riuscita!');
    console.log('Numero di utenti nel database:', result.length);
    return result;
  } catch (error) {
    console.error('Errore durante la connessione al database:', error);
    throw error;
  }
} 