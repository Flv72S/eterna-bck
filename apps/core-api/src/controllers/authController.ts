import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { db } from '../db';
import { users } from '../db/schema';
import { eq } from 'drizzle-orm';
import { RegisterInput, LoginInput } from '../schemas/auth';

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, nome, cognome, telefono, versione, sezione_id } = req.body as RegisterInput;

    // Verifica se l'email esiste già
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email)
    });

    if (existingUser) {
      return res.status(409).json({
        message: 'Email già registrata'
      });
    }

    // Hash della password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Creazione nuovo utente
    const [newUser] = await db.insert(users).values({
      email,
      pin: hashedPassword,
      nome,
      cognome,
      telefono,
      versione,
      sezione_id,
      ultima_login: new Date()
    }).returning();

    return res.status(201).json({
      message: 'Utente registrato con successo',
      token: '123456' // Token temporaneo
    });
  } catch (error) {
    console.error('Errore durante la registrazione:', error);
    return res.status(500).json({
      message: 'Errore durante la registrazione'
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as LoginInput;

    // Recupera l'utente
    const user = await db.query.users.findFirst({
      where: eq(users.email, email)
    });

    if (!user) {
      return res.status(401).json({
        message: 'Credenziali non valide'
      });
    }

    // Verifica la password
    const isPasswordValid = await bcrypt.compare(password, user.pin);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: 'Credenziali non valide'
      });
    }

    // Aggiorna ultimo login
    await db.update(users)
      .set({ ultima_login: new Date() })
      .where(eq(users.id, user.id));

    return res.status(200).json({
      token: '123456' // Token temporaneo
    });
  } catch (error) {
    console.error('Errore durante il login:', error);
    return res.status(500).json({
      message: 'Errore durante il login'
    });
  }
}; 