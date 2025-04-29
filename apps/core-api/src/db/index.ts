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