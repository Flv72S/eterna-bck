-- Creazione degli enum
CREATE TYPE user_role AS ENUM ('user', 'pro', 'admin', 'superadmin');
CREATE TYPE user_version AS ENUM ('free', 'premium');
CREATE TYPE account_status AS ENUM ('attivo', 'sospeso', 'in_attesa_verifica');

-- Creazione della tabella users
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) NOT NULL UNIQUE,
  pin TEXT NOT NULL,
  nome VARCHAR(100) NOT NULL,
  cognome VARCHAR(100) NOT NULL,
  telefono VARCHAR(20) NOT NULL,
  versione user_version NOT NULL,
  ruolo user_role NOT NULL DEFAULT 'user',
  seriale_gioiello VARCHAR(255),
  sezione_id UUID NOT NULL,
  email_verificata BOOLEAN DEFAULT false,
  telefono_verificato BOOLEAN DEFAULT false,
  stato_account account_status DEFAULT 'attivo',
  ultima_login TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
); 