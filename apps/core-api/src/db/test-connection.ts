import { db, testConnection } from './index';

async function main() {
  try {
    const users = await testConnection();
    console.log('Utenti nel database:', users);
  } catch (error) {
    console.error('Errore durante il test:', error);
  } finally {
    process.exit(0);
  }
}

main(); 