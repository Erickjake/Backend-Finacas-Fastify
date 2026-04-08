// src/hooks/auth.ts
import { FastifyReply, FastifyRequest } from 'fastify';

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    // Esta função verifica se o token no Header 'Authorization' é válido
    await request.jwtVerify();
  } catch {
    return reply.status(401).send({ message: 'Token inválido ou ausente.' });
  }
}
