import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import * as schema from './schema'

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'N0nn0c4rl0!!',
  database: 'eterna_db'
})

export const db = drizzle(pool, { schema })

export async function testConnection() {
  try {
    const result = await db.select().from(schema.users)
    console.log('Connessione al database riuscita!')
    console.log('Numero di utenti nel database:', result.length)
    return result
  } catch (error) {
    console.error('Errore durante la connessione al database:', error)
    throw error
  }
} 