// src/routes/user/v1/user.route.ts
import type { FastifyInstance } from 'fastify';
import { UserController } from '../../../User/v1/Controller/UserController.js';
import { authenticate } from '../../../hook/auth.js';

export async function userV1Routes(app: FastifyInstance) {
  const userController = new UserController();

  // 1. ROTAS PÚBLICAS (Sem Token)
  app.post('/', async (request, reply) =>
    userController.registerUser(request, reply),
  );
  app.post('/login', async (request, reply) =>
    userController.loginUser(request, reply),
  );

  // 2. ROTAS PRIVADAS (Com Token)
  app.register(async privateRoutes => {
    privateRoutes.addHook('onRequest', authenticate);

    privateRoutes.get('/me', async request => {
      // Exemplo de rota protegida dentro do módulo de user
      return { user: request.user };
    });
  });
}
