# ETERNÀ - Sistema di Gestione

## 🚀 Panoramica

ETERNÀ è un sistema di gestione moderno e scalabile, sviluppato con Node.js, PostgreSQL, Drizzle ORM e una struttura monorepo.

## 📁 Struttura del Progetto

```
eterna-bck/
├── apps/
│   ├── core-api/         # Backend API
│   └── core-ui/          # Frontend UI
```

## 🛠️ Tecnologie Utilizzate

- **Backend**: Node.js, TypeScript, Drizzle ORM
- **Database**: PostgreSQL
- **Frontend**: React, Tailwind CSS (in sviluppo)

## 🗄️ Database

### Configurazione
- **Nome Database**: eterna_db
- **Host**: localhost
- **Utente**: postgres
- **Password**: N0nn0c4rl0!!

### Struttura

#### Tabella `users`
- `id`: UUID (PK)
- `email`: VARCHAR(255)
- `pin`: TEXT (hashed)
- `nome`: VARCHAR(100)
- `cognome`: VARCHAR(100)
- `telefono`: VARCHAR(20)
- `versione`: ENUM ('free', 'premium')
- `ruolo`: ENUM ('user', 'pro', 'admin', 'superadmin')
- `seriale_gioiello`: VARCHAR(255)
- `sezione_id`: UUID
- `email_verificata`: BOOLEAN
- `telefono_verificato`: BOOLEAN
- `stato_account`: ENUM ('attivo', 'sospeso', 'in_attesa_verifica')
- `ultima_login`: TIMESTAMP
- `created_at`: TIMESTAMP
- `updated_at`: TIMESTAMP

## 🚀 Avvio del Progetto

### Backend (core-api)
```bash
cd apps/core-api
npm install
npm run dev
```

### Frontend (core-ui)
```bash
cd apps/core-ui
npm install
npm run dev
```

## 📝 Note di Sviluppo

- Il database è configurato con Drizzle ORM
- La struttura è progettata per essere scalabile e mantenibile
- Gli enum sono utilizzati per garantire l'integrità dei dati
- Il sistema include un utente SuperAdmin predefinito

## 🔒 Sicurezza

- Le password sono hashed utilizzando bcrypt
- Gli enum garantiscono l'integrità dei dati
- Le credenziali sensibili sono gestite tramite variabili d'ambiente

## 📄 Licenza

Proprietario: ETERNÀ 