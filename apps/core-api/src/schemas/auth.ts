import { z } from 'zod';

export const registerSchema = z.object({
  email: z.string().email('Email non valida'),
  password: z.string().min(8, 'La password deve essere di almeno 8 caratteri'),
  nome: z.string().min(2, 'Il nome deve essere di almeno 2 caratteri'),
  cognome: z.string().min(2, 'Il cognome deve essere di almeno 2 caratteri'),
  telefono: z.string().min(10, 'Il numero di telefono non è valido'),
  versione: z.string().min(1, 'La versione è obbligatoria'),
  sezione_id: z.number().int().positive('L\'ID della sezione deve essere un numero positivo')
});

export const loginSchema = z.object({
  email: z.string().email('Email non valida'),
  password: z.string().min(1, 'La password è obbligatoria')
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>; 