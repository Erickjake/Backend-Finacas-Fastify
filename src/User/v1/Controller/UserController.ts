import type { FastifyReply, FastifyRequest } from 'fastify';
import {
  loginUserSchema,
  registerUserSchema,
} from '../../../schema/user.schema.js';
import { UserService } from '../Service/UserService.js';

export class UserController {
  async registerUser(req: FastifyRequest, reply: FastifyReply) {
    // 1. Zod Valida. Se falhar, atira erro e vai direto para o app.ts
    const data = registerUserSchema.parse(req.body);

    const userService = new UserService();

    // 2. Só tenta registar se o Zod aprovar.
    // Não precisamos de try/catch aqui! Se o UserService der erro
    // (ex: email duplicado), o throw cai no Global Error Handler.
    await userService.registerUser(data);

    return reply
      .status(201)
      .send({ message: 'Usuário registrado com sucesso.' });
  }

  async loginUser(req: FastifyRequest, reply: FastifyReply) {
    const data = loginUserSchema.parse(req.body);

    const userService = new UserService();

    try {
      const user = await userService.loginUser(data.email, data.password);

      const token = await reply.jwtSign(
        { name: user.name },
        {
          sign: {
            sub: user.id,
            expiresIn: '7d',
          },
        },
      );

      return reply.status(200).send({ token });
    } catch (error) {
      if (error === 'Credenciais inválidas.') {
        return reply.status(401).send({ message: 'Credenciais inválidas.' });
      }
      throw error; // Deixa o Global Error Handler lidar com outros erros
    }
  }
}
