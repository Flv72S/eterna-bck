import { pgTable, uuid, text, varchar, timestamp, boolean } from 'drizzle-orm/pg-core'
import { userRoleEnum, userVersionEnum, accountStatusEnum } from './enums'

// Definizione della tabella users
export const users = pgTable('users', {
  // Identificatori
  id: uuid('id').primaryKey().defaultRandom(),
  
  // Dati personali
  email: varchar('email', { length: 255 }).notNull().unique(),
  pin: text('pin').notNull(), // PIN hashato
  nome: varchar('nome', { length: 100 }).notNull(),
  cognome: varchar('cognome', { length: 100 }).notNull(),
  telefono: varchar('telefono', { length: 20 }).notNull(),

  // Configurazione account
  versione: userVersionEnum('versione').notNull(),
  ruolo: userRoleEnum('ruolo').notNull().default('user'),
  seriale_gioiello: varchar('seriale_gioiello', { length: 255 }),

  // Collegamenti
  sezione_id: uuid('sezione_id').notNull(), // FK verso eterna_sections

  // Verifiche e stato
  email_verificata: boolean('email_verificata').default(false),
  telefono_verificato: boolean('telefono_verificato').default(false),
  stato_account: accountStatusEnum('stato_account').default('attivo'),

  // Timestamps
  ultima_login: timestamp('ultima_login'),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow()
}) 