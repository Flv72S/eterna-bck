# Dipendenze del Sistema Eterna

Questo documento fornisce una panoramica completa delle dipendenze e delle istruzioni di installazione per il sistema Eterna.

## Requisiti di Sistema

- Node.js (v22.14.0 o superiore)
- pnpm (v10.10.0 o superiore)
- PostgreSQL (v15 o superiore)

## Struttura del Progetto

Il progetto Eterna è organizzato come un monorepo utilizzando la seguente struttura:

```
eterna/
├── apps/
│   └── core-api/        # API Core in TypeScript
└── ...
```

## Core API

### Dipendenze Principali

```json
{
  "bcryptjs": "^2.4.3",      // Crittografia password
  "cors": "^2.8.5",          // Gestione CORS
  "dotenv": "^16.4.1",       // Gestione variabili d'ambiente
  "drizzle-orm": "^0.29.3",  // ORM per database
  "express": "^4.18.2",      // Framework web
  "jsonwebtoken": "^9.0.2",  // Gestione JWT
  "pg": "^8.11.3",          // Client PostgreSQL
  "zod": "^3.22.4"          // Validazione dati
}
```

### Dipendenze di Sviluppo

```json
{
  "@types/bcryptjs": "^2.4.6",
  "@types/cors": "^2.8.17",
  "@types/express": "^5.0.1",
  "@types/jsonwebtoken": "^9.0.5",
  "@types/node": "^20.11.16",
  "@types/pg": "^8.11.0",
  "drizzle-kit": "^0.20.13",
  "ts-node": "^10.9.2",
  "ts-node-dev": "^2.0.0",
  "typescript": "^5.3.3"
}
```

## Istruzioni di Installazione

### 1. Prerequisiti

```bash
# Installazione di Node.js
# Scarica e installa Node.js da https://nodejs.org/

# Installazione di pnpm
npm install -g pnpm

# Installazione di PostgreSQL
# Scarica e installa PostgreSQL da https://www.postgresql.org/
```

### 2. Configurazione del Progetto

```bash
# Clone del repository
git clone <repository-url>
cd eterna

# Installazione delle dipendenze
cd apps/core-api
pnpm install
```

### 3. Configurazione Ambiente

Crea un file `.env` nella cartella `apps/core-api` con le seguenti variabili:

```env
PORT=3000
NODE_ENV=development
DATABASE_URL=postgresql://user:password@localhost:5432/eterna
```

### 4. Avvio del Progetto

```bash
# Avvio in modalità sviluppo
pnpm dev

# Build per produzione
pnpm build
pnpm start
```

## Script Disponibili

- `pnpm build`: Compila il progetto TypeScript
- `pnpm start`: Avvia il server in modalità produzione
- `pnpm dev`: Avvia il server in modalità sviluppo con hot-reload
- `pnpm seed`: Popola il database con dati iniziali
- `pnpm generate`: Genera le migrazioni del database
- `pnpm migrate`: Applica le migrazioni al database

## Note sulla Sicurezza

- Assicurarsi di non committare mai il file `.env`
- Utilizzare sempre variabili d'ambiente per le credenziali
- Mantenere aggiornate le dipendenze per questioni di sicurezza

## Aggiornamento Dipendenze

Per aggiornare le dipendenze all'ultima versione compatibile:

```bash
pnpm update
```

Per verificare le dipendenze obsolete:

```bash
pnpm outdated
``` 