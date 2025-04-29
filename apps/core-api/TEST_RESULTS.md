# Risultati dei Test API di Autenticazione

## Risultati Attesi

### 1. Test Endpoint di Registrazione (`POST /api/auth/register`)

#### 1.1 Registrazione Valida
- **Status Code Atteso:** 201
- **Risposta Attesa:** `{"message": "Utente registrato con successo", "token": "123456"}`
- **Verifica Database:** Record utente presente con email, nome, cognome, ecc.

#### 1.2 Email Già Esistente
- **Status Code Atteso:** 409
- **Risposta Attesa:** `{"message": "Email già registrata"}`

#### 1.3 Dati Mancanti
- **Status Code Atteso:** 400
- **Risposta Attesa:** Messaggio di errore Zod con i campi mancanti

#### 1.4 Formato Email Invalido
- **Status Code Atteso:** 400
- **Risposta Attesa:** Messaggio di errore Zod per email non valida

#### 1.5 Password Corta
- **Status Code Atteso:** 400
- **Risposta Attesa:** Messaggio di errore Zod per password troppo corta

### 2. Test Endpoint di Login (`POST /api/auth/login`)

#### 2.1 Login Valido
- **Status Code Atteso:** 200
- **Risposta Attesa:** `{"token": "123456"}`
- **Verifica Database:** Campo `ultima_login` aggiornato

#### 2.2 Email Inesistente
- **Status Code Atteso:** 401
- **Risposta Attesa:** `{"message": "Credenziali non valide"}`

#### 2.3 Password Errata
- **Status Code Atteso:** 401
- **Risposta Attesa:** `{"message": "Credenziali non valide"}`

#### 2.4 Dati Mancanti
- **Status Code Atteso:** 400
- **Risposta Attesa:** Messaggio di errore Zod per password mancante

## Risultati Effettivi

Per eseguire i test, si consiglia di utilizzare Postman o un altro client HTTP con le seguenti configurazioni:

1. **Registrazione Valida**
   ```
   POST http://localhost:3000/api/auth/register
   Content-Type: application/json

   {
     "email": "test@example.com",
     "password": "password123",
     "nome": "Mario",
     "cognome": "Rossi",
     "telefono": "1234567890",
     "versione": "1.0",
     "sezione_id": 1
   }
   ```

2. **Login Valido**
   ```
   POST http://localhost:3000/api/auth/login
   Content-Type: application/json

   {
     "email": "test@example.com",
     "password": "password123"
   }
   ```

## Verifiche Database

Dopo i test, eseguire le seguenti query per verificare i dati:

1. **Verifica Utente Registrato**
   ```sql
   SELECT * FROM users WHERE email = 'test@example.com';
   ```

2. **Verifica Ultimo Login**
   ```sql
   SELECT ultima_login FROM users WHERE email = 'test@example.com';
   ```

## Note

- Assicurarsi che il server sia in esecuzione (`pnpm dev`)
- Verificare che il database sia accessibile e configurato correttamente
- I test dovrebbero essere eseguiti in sequenza per verificare correttamente tutti gli scenari 