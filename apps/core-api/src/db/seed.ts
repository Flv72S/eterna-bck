import { db } from './index'
import { users } from './schema'
import bcrypt from 'bcryptjs'

async function seed() {
  try {
    const hashedPin = await bcrypt.hash('1234', 10) // Cambia '1234' con il pin desiderato
    
    await db.insert(users).values({
      email: 'founder@eterna.io',
      pin: hashedPin,
      nome: 'Founder',
      cognome: 'Eterna',
      telefono: '+390000000000',
      versione: 'premium',
      ruolo: 'superadmin',
      sezione_id: '00000000-0000-0000-0000-000000000000', // UUID temporaneo
      email_verificata: true,
      telefono_verificato: true
    })

    console.log('Seed completato con successo!')
  } catch (error) {
    console.error('Errore durante il seed:', error)
  } finally {
    process.exit()
  }
}

seed() 