import type { Config } from 'drizzle-kit'
import * as dotenv from 'dotenv'
dotenv.config()

export default {
  schema: './src/db/schema.ts',
  out: './drizzle',
  driver: 'pg',
  dialect: 'postgresql',
  dbCredentials: {
    host: 'localhost',
    user: 'postgres',
    password: 'N0nn0c4rl0!!',
    database: 'eterna_db',
  },
} satisfies Config 