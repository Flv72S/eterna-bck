import { pgTable, uuid, text, varchar, timestamp, boolean, pgEnum } from 'drizzle-orm/pg-core'

export const userRoleEnum = pgEnum('user_role', ['user', 'pro', 'admin', 'superadmin'])
export const userVersionEnum = pgEnum('user_version', ['free', 'premium'])
export const accountStatusEnum = pgEnum('account_status', ['attivo', 'sospeso', 'in_attesa_verifica'])

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  pin: text('pin').notNull(), // hashed
  nome: varchar('nome', { length: 100 }).notNull(),
  cognome: varchar('cognome', { length: 100 }).notNull(),
  telefono: varchar('telefono', { length: 20 }).notNull(),
  versione: userVersionEnum('versione').notNull(),
  ruolo: userRoleEnum('ruolo').notNull().default('user'),
  seriale_gioiello: varchar('seriale_gioiello', { length: 255 }),
  sezione_id: uuid('sezione_id').notNull(),
  email_verificata: boolean('email_verificata').default(false),
  telefono_verificato: boolean('telefono_verificato').default(false),
  stato_account: accountStatusEnum('stato_account').default('attivo'),
  ultima_login: timestamp('ultima_login'),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow()
}) 