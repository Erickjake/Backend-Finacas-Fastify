import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { app } from '../../app';
import { prisma } from '../../lib/prisma';

describe('User Routes (Integration)', () => {
  // Antes de todos os testes, garantimos que o Fastify está pronto
  beforeAll(async () => {
    await app.ready();
    await prisma.user.deleteMany({
      where: { email: 'test@example.com' },
    });
  });

  // Fechamos o servidor após os testes
  afterAll(async () => {
    await app.close();
  });

  it('deve ser possível criar um novo utilizador', async () => {
    const response = await request(app.server).post('/v1/users').send({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
    });

    expect(response.status).toBe(201);

    // Em vez de procurar por "message", verifica se o email está correto
    expect(response.body).toHaveProperty('email', 'test@example.com');
    expect(response.body).not.toHaveProperty('password'); // Boa prática: não devolver a password
  });

  it('não deve permitir registar um e-mail já existente', async () => {
    // Tentamos registar o mesmo e-mail do teste anterior
    const response = await request(app.server).post('/v1/users').send({
      name: 'Another User',
      email: 'test@example.com',
      password: 'password123',
    });

    expect(response.status).toBe(409); // Conflict
  });
});
