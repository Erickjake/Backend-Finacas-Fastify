// src/User/v1/Schemas/user.schema.ts
import { z } from 'zod';

export const registerUserSchema = z.object({
  name: z.string().min(2, 'O nome deve ter pelo menos 2 caracteres.'),
  email: z.email('Formato de e-mail inválido.'),
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres.'),
});

// A MAGIA ACONTECE AQUI:
// O Zod extrai o tipo TypeScript automaticamente a partir da validação acima!
export type RegisterUserDTO = z.infer<typeof registerUserSchema>;

export const loginUserSchema = z.object({
  email: z.email('Formato de e-mail inválido.'),
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres.'),
});

export type LoginUserDTO = z.infer<typeof loginUserSchema>;
