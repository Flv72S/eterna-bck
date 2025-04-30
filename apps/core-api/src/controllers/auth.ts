import { Request, Response } from 'express';
import { AppError } from '../middleware/errorHandler';
import { z } from 'zod';
import { db } from '../db';
import { users } from '../db/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  nome: z.string().min(2),
  cognome: z.string().min(2),
  telefono: z.string().min(6),
  versione: z.string(),
  sezione_id: z.string().uuid()
});

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, nome, cognome, telefono, versione, sezione_id } = registerSchema.parse(req.body);

    // Verifica se l'email esiste già
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email)
    });

    if (existingUser) {
      throw new AppError(409, 'Email già registrata');
    }

    // Hash della password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crea il nuovo utente
    const newUser = await db.insert(users).values({
      email,
      pin: hashedPassword,
      nome,
      cognome,
      telefono,
      versione,
      sezione_id,
      stato_account: 'attivo',
      ruolo: 'user',
      ultima_login: new Date()
    }).returning();

    // Genera il token JWT
    const token = jwt.sign(
      { userId: newUser[0].id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '1h' }
    );

    res.status(201).json({ token });
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new AppError(400, 'Dati non validi', error.errors);
    }
    throw error;
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = loginSchema.parse(req.body);
    
    const user = await db.query.users.findFirst({
      where: eq(users.email, email)
    });

    if (!user) {
      throw new AppError(401, 'Credenziali non valide');
    }

    const isValidPassword = await bcrypt.compare(password, user.pin);
    if (!isValidPassword) {
      throw new AppError(401, 'Credenziali non valide');
    }

    // Aggiorna l'ultimo login
    await db.update(users)
      .set({ ultima_login: new Date() })
      .where(eq(users.id, user.id));

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new AppError(400, 'Dati non validi', error.errors);
    }
    throw error;
  }
}; 