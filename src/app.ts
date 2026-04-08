import fastify from 'fastify';
import fastifyJwt from '@fastify/jwt';
import { ZodError } from 'zod';
import { userV1Routes } from './routes/user/v1/user.route.js';

// Criamos a app com a correção da barra final (trailing slash) que vimos antes!
export const app = fastify({ ignoreTrailingSlash: true });

// 1. Registamos o JWT
app.register(fastifyJwt, {
  secret: 'meu-segredo-super-seguro-financas-123',
});

// 2. Registamos as tuas Rotas
app.register(userV1Routes, { prefix: '/v1/users' });

// 3. Global Error Handler (A mágica do Zod)
app.setErrorHandler((error, request, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Erro de validação.',
      issues: error.format(),
    });
  }

  if (process.env.NODE_ENV !== 'production') {
    console.error(error);
  }

  return reply.status(500).send({ message: 'Erro interno do servidor.' });
});
