// src/routes/user/v1/user.route.ts
import type { FastifyInstance } from 'fastify';
import { UserController } from '../../../User/v1/Controller/UserController.js';
import { authenticate } from '../../../hook/auth.js';

export async function userV1Routes(app: FastifyInstance) {
  const userController = new UserController();

  app.addHook('onRequest', authenticate);
  // Registo: POST /v1/users
  app.post('/', async (request, reply) => {
    return userController.registerUser(request, reply);
  });

  // Login: POST /v1/users/login
  app.post('/login', async (request, reply) => {
    return userController.loginUser(request, reply);
  });
}
