import bcrypt from 'bcryptjs';
import type { RegisterUserDTO } from '../../../schema/user.schema.js';
import { prisma } from '../../../lib/prisma.js';

export class UserService {
  async registerUser({ name, email, password }: RegisterUserDTO) {
    const userExists = await prisma.user.findUnique({ where: { email } });

    if (userExists) {
      throw new Error('Usuário já existe com esse e-mail.');
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        passwordHash,
        email,
      },
    });
    return newUser;
  }

  async loginUser(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new Error('Usuário não encontrado.');
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      throw new Error('Senha inválida.');
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }
}
