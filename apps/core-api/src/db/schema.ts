import { pgTable, uuid, text, varchar, timestamp, boolean, integer, date, pgEnum } from 'drizzle-orm/pg-core'
import { userRoleEnum, userVersionEnum, accountStatusEnum, userGenderEnum } from './enums'

// Definizione degli ENUM
export const userRoleEnum = pgEnum('user_role', ['user', 'admin', 'manager'])
export const accountStatusEnum = pgEnum('account_status', ['active', 'suspended', 'deactivated'])
export const userGenderEnum = pgEnum('user_gender', ['male', 'female', 'other', 'prefer_not_to_say'])

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
  data_nascita: date('data_nascita'),
  indirizzo: text('indirizzo'),
  codice_fiscale: varchar('codice_fiscale', { length: 16 }),
  genere: userGenderEnum('genere'),
  lingua_preferita: varchar('lingua_preferita', { length: 5 }).default('it'),
  immagine_profilo: varchar('immagine_profilo', { length: 255 }),

  // Configurazione account
  versione: varchar('versione', { length: 50 }).notNull(),
  ruolo: userRoleEnum('ruolo').notNull().default('user'),
  seriale_gioielliere: varchar('seriale_gioielliere', { length: 100 }),

  // Collegamenti
  sezione_id: uuid('sezione_id').notNull(), // FK verso eterna_sections
  riferito_da: uuid('riferito_da').references(() => users.id, { onDelete: 'set null' }),

  // Verifiche e stato
  email_verificata: boolean('email_verificata').default(false),
  telefono_verificato: boolean('telefono_verificato').default(false),
  stato_account: accountStatusEnum('stato_account').notNull(),

  // Sicurezza e Autenticazione
  token_verifica_email: varchar('token_verifica_email', { length: 255 }).unique(),
  token_verifica_telefono: varchar('token_verifica_telefono', { length: 255 }).unique(),
  token_reset_password: varchar('token_reset_password', { length: 255 }).unique(),
  data_scadenza_token_verifica_email: timestamp('data_scadenza_token_verifica_email', { withTimezone: true }),
  data_scadenza_token_verifica_telefono: timestamp('data_scadenza_token_verifica_telefono', { withTimezone: true }),
  data_scadenza_token_reset_password: timestamp('data_scadenza_token_reset_password', { withTimezone: true }),
  tentativi_login_falliti: integer('tentativi_login_falliti').default(0),
  bloccato_fino_a: timestamp('bloccato_fino_a', { withTimezone: true }),
  ultimo_indirizzo_ip: varchar('ultimo_indirizzo_ip', { length: 45 }),
  user_agent_ultimo_login: text('user_agent_ultimo_login'),

  // Preferenze Utente
  notifiche_email_attive: boolean('notifiche_email_attive').default(true),
  notifiche_sms_attive: boolean('notifiche_sms_attive').default(false),
  tema_preferito: varchar('tema_preferito', { length: 20 }).default('light'),
  fuso_orario: varchar('fuso_orario', { length: 50 }),

  // Timestamps
  ultima_login: timestamp('ultima_login'),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow(),
  data_ultimo_aggiornamento_profilo: timestamp('data_ultimo_aggiornamento_profilo', { withTimezone: true }),
  termini_e_condizioni_accettati_il: timestamp('termini_e_condizioni_accettati_il', { withTimezone: true }),
  privacy_policy_accettata_il: timestamp('privacy_policy_accettata_il', { withTimezone: true })
}) 