@echo off
echo Test di Registrazione Valida
curl -X POST http://localhost:3000/api/auth/register ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"test@example.com\",\"password\":\"password123\",\"nome\":\"Mario\",\"cognome\":\"Rossi\",\"telefono\":\"1234567890\",\"versione\":\"1.0\",\"sezione_id\":1}"

echo.
echo Test di Email Già Esistente
curl -X POST http://localhost:3000/api/auth/register ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"test@example.com\",\"password\":\"password123\",\"nome\":\"Mario\",\"cognome\":\"Rossi\",\"telefono\":\"1234567890\",\"versione\":\"1.0\",\"sezione_id\":1}"

echo.
echo Test di Dati Mancanti
curl -X POST http://localhost:3000/api/auth/register ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"test@example.com\",\"password\":\"password123\"}"

echo.
echo Test di Formato Email Invalido
curl -X POST http://localhost:3000/api/auth/register ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"invalid-email\",\"password\":\"password123\",\"nome\":\"Mario\",\"cognome\":\"Rossi\",\"telefono\":\"1234567890\",\"versione\":\"1.0\",\"sezione_id\":1}"

echo.
echo Test di Password Corta
curl -X POST http://localhost:3000/api/auth/register ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"test2@example.com\",\"password\":\"123\",\"nome\":\"Mario\",\"cognome\":\"Rossi\",\"telefono\":\"1234567890\",\"versione\":\"1.0\",\"sezione_id\":1}"

echo.
echo Test di Login Valido
curl -X POST http://localhost:3000/api/auth/login ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"test@example.com\",\"password\":\"password123\"}"

echo.
echo Test di Email Inesistente
curl -X POST http://localhost:3000/api/auth/login ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"nonexistent@example.com\",\"password\":\"password123\"}"

echo.
echo Test di Password Errata
curl -X POST http://localhost:3000/api/auth/login ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"test@example.com\",\"password\":\"wrongpassword\"}"

echo.
echo Test di Dati Mancanti
curl -X POST http://localhost:3000/api/auth/login ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"test@example.com\"}" 