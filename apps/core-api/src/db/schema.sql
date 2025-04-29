-- Creazione degli enum
CREATE TYPE user_role AS ENUM ('user', 'pro', 'admin', 'superadmin');
CREATE TYPE user_version AS ENUM ('free', 'premium');
CREATE TYPE account_status AS ENUM ('attivo', 'sospeso', 'in_attesa_verifica');
CREATE TYPE user_gender AS ENUM ('maschile', 'femminile', 'altro', 'non_specificato');

-- Creazione della tabella users
CREATE TABLE users (
  -- Identificatori
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Dati personali
  email VARCHAR(255) NOT NULL UNIQUE,
  pin TEXT NOT NULL, -- PIN hashato
  nome VARCHAR(100) NOT NULL,
  cognome VARCHAR(100) NOT NULL,
  telefono VARCHAR(20) NOT NULL,
  data_nascita DATE,
  indirizzo TEXT,
  codice_fiscale VARCHAR(16),
  genere user_gender,
  lingua_preferita VARCHAR(5) DEFAULT 'it',
  immagine_profilo VARCHAR(255),

  -- Configurazione account
  versione user_version NOT NULL,
  ruolo user_role NOT NULL DEFAULT 'user',
  seriale_gioiello VARCHAR(255),

  -- Collegamenti
  sezione_id UUID NOT NULL, -- FK verso eterna_sections
  riferito_da UUID REFERENCES users(id) ON DELETE SET NULL,

  -- Verifiche e stato
  email_verificata BOOLEAN DEFAULT false,
  telefono_verificato BOOLEAN DEFAULT false,
  stato_account account_status DEFAULT 'attivo',

  -- Sicurezza e Autenticazione
  token_verifica_email VARCHAR(255) UNIQUE,
  token_verifica_telefono VARCHAR(255) UNIQUE,
  token_reset_password VARCHAR(255) UNIQUE,
  data_scadenza_token_verifica_email TIMESTAMP WITH TIME ZONE,
  data_scadenza_token_verifica_telefono TIMESTAMP WITH TIME ZONE,
  data_scadenza_token_reset_password TIMESTAMP WITH TIME ZONE,
  tentativi_login_falliti INTEGER DEFAULT 0,
  bloccato_fino_a TIMESTAMP WITH TIME ZONE,
  ultimo_indirizzo_ip VARCHAR(45),
  user_agent_ultimo_login TEXT,

  -- Preferenze Utente
  notifiche_email_attive BOOLEAN DEFAULT true,
  notifiche_sms_attive BOOLEAN DEFAULT false,
  tema_preferito VARCHAR(20) DEFAULT 'light',
  fuso_orario VARCHAR(50),

  -- Timestamps
  ultima_login TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  data_ultimo_aggiornamento_profilo TIMESTAMP WITH TIME ZONE,
  termini_e_condizioni_accettati_il TIMESTAMP WITH TIME ZONE,
  privacy_policy_accettata_il TIMESTAMP WITH TIME ZONE
); 