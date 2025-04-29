# Struttura della Tabella `users` nel Database `eterna_db`

## Descrizione
La tabella `users` contiene le informazioni degli utenti del sistema. Questa documentazione descrive la struttura della tabella, inclusi i campi, i tipi di dati, i vincoli e gli enum associati.

## Campi

| Nome Campo | Tipo Dati | Nullable | Default | Descrizione |
|------------|-----------|----------|---------|-------------|
| id | UUID | NO | gen_random_uuid() | Identificatore univoco dell'utente |
| email | VARCHAR | NO | - | Indirizzo email dell'utente |
| nome | VARCHAR | NO | - | Nome dell'utente |
| cognome | VARCHAR | NO | - | Cognome dell'utente |
| telefono | VARCHAR | NO | - | Numero di telefono dell'utente |
| versione | VARCHAR | NO | - | Versione dell'utente |
| ruolo | ENUM | NO | 'user' | Ruolo dell'utente (user, admin, etc.) |
| seriale_gioielliere | VARCHAR | YES | - | Numero seriale del gioielliere |
| sezione_id | UUID | NO | - | ID della sezione a cui appartiene l'utente |
| email_verificata | BOOLEAN | YES | false | Indica se l'email è stata verificata |
| telefono_verificato | BOOLEAN | YES | false | Indica se il telefono è stato verificato |
| stato_account | ENUM | NO | - | Stato dell'account (attivo, sospeso, etc.) |
| ultima_login | TIMESTAMP | YES | - | Data e ora dell'ultimo login |
| created_at | TIMESTAMP | NO | CURRENT_TIMESTAMP | Data e ora di creazione del record |
| updated_at | TIMESTAMP | NO | CURRENT_TIMESTAMP | Data e ora di aggiornamento del record |
| data_nascita | DATE | YES | - | Data di nascita dell'utente |
| indirizzo | VARCHAR | YES | - | Indirizzo dell'utente |
| codice_fiscale | VARCHAR | YES | - | Codice fiscale dell'utente |
| genere | ENUM | YES | - | Genere dell'utente |
| lingua_preferita | VARCHAR | YES | - | Lingua preferita dell'utente |
| immagine_profilo | VARCHAR | YES | - | URL dell'immagine del profilo |
| token_verifica_email | VARCHAR | YES | - | Token per la verifica dell'email |
| token_verifica_telefono | VARCHAR | YES | - | Token per la verifica del telefono |
| token_reset_password | VARCHAR | YES | - | Token per il reset della password |
| data_scadenza_token_verifica_email | TIMESTAMP | YES | - | Data di scadenza del token di verifica email |
| data_scadenza_token_verifica_telefono | TIMESTAMP | YES | - | Data di scadenza del token di verifica telefono |
| data_scadenza_token_reset_password | TIMESTAMP | YES | - | Data di scadenza del token di reset password |
| tentativi_login_falliti | INTEGER | YES | 0 | Numero di tentativi di login falliti |
| bloccato_fino_a | TIMESTAMP | YES | - | Data fino a quando l'account è bloccato |
| ultimo_indirizzo_ip | VARCHAR | YES | - | Ultimo indirizzo IP utilizzato per il login |
| user_agent_ultimo_login | TEXT | YES | - | User agent dell'ultimo login |
| notifiche_email_attive | BOOLEAN | YES | true | Indica se le notifiche email sono attive |
| notifiche_sms_attive | BOOLEAN | YES | false | Indica se le notifiche SMS sono attive |
| tema_preferito | VARCHAR | YES | - | Tema preferito dell'utente |
| fuso_orario | VARCHAR | YES | - | Fuso orario preferito dell'utente |
| riferito_da | UUID | YES | - | ID dell'utente che ha riferito questo utente |
| data_ultimo_aggiornamento_profilo | TIMESTAMP | YES | - | Data dell'ultimo aggiornamento del profilo |
| termini_e_condizioni_accettati_il | TIMESTAMP | YES | - | Data di accettazione dei termini e condizioni |
| privacy_policy_accettata_il | TIMESTAMP | YES | - | Data di accettazione della privacy policy |

## Vincoli

- **Chiave Primaria**: `id`
- **Chiavi Uniche**:
  - `email`
  - `token_verifica_email`
  - `token_verifica_telefono`
  - `token_reset_password`
- **Chiavi Esterne**:
  - `riferito_da` riferito a `users(id)` con azione `ON DELETE SET NULL`

## Enum

- **user_role**: Definisce i ruoli possibili per gli utenti
- **account_status**: Definisce gli stati possibili dell'account
- **user_gender**: Definisce i generi possibili per gli utenti

## Note
- I campi `created_at` e `updated_at` vengono aggiornati automaticamente.
- I token di verifica e reset password hanno date di scadenza associate.
- L'account può essere bloccato dopo un certo numero di tentativi di login falliti. 