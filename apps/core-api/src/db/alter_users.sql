-- Aggiunta del nuovo enum per il genere
CREATE TYPE user_gender AS ENUM ('maschile', 'femminile', 'altro', 'non_specificato');

-- Aggiunta dei nuovi campi alla tabella users
ALTER TABLE users
  -- Informazioni Personali
  ADD COLUMN data_nascita DATE,
  ADD COLUMN indirizzo TEXT,
  ADD COLUMN codice_fiscale VARCHAR(16),
  ADD COLUMN genere user_gender,
  ADD COLUMN lingua_preferita VARCHAR(5) DEFAULT 'it',
  ADD COLUMN immagine_profilo VARCHAR(255),

  -- Sicurezza e Autenticazione
  ADD COLUMN token_verifica_email VARCHAR(255) UNIQUE,
  ADD COLUMN token_verifica_telefono VARCHAR(255) UNIQUE,
  ADD COLUMN token_reset_password VARCHAR(255) UNIQUE,
  ADD COLUMN data_scadenza_token_verifica_email TIMESTAMP WITH TIME ZONE,
  ADD COLUMN data_scadenza_token_verifica_telefono TIMESTAMP WITH TIME ZONE,
  ADD COLUMN data_scadenza_token_reset_password TIMESTAMP WITH TIME ZONE,
  ADD COLUMN tentativi_login_falliti INTEGER DEFAULT 0,
  ADD COLUMN bloccato_fino_a TIMESTAMP WITH TIME ZONE,
  ADD COLUMN ultimo_indirizzo_ip VARCHAR(45),
  ADD COLUMN user_agent_ultimo_login TEXT,

  -- Preferenze Utente
  ADD COLUMN notifiche_email_attive BOOLEAN DEFAULT true,
  ADD COLUMN notifiche_sms_attive BOOLEAN DEFAULT false,
  ADD COLUMN tema_preferito VARCHAR(20) DEFAULT 'light',
  ADD COLUMN fuso_orario VARCHAR(50),

  -- Informazioni Aggiuntive
  ADD COLUMN riferito_da UUID REFERENCES users(id) ON DELETE SET NULL,
  ADD COLUMN data_ultimo_aggiornamento_profilo TIMESTAMP WITH TIME ZONE,
  ADD COLUMN termini_e_condizioni_accettati_il TIMESTAMP WITH TIME ZONE,
  ADD COLUMN privacy_policy_accettata_il TIMESTAMP WITH TIME ZONE; 