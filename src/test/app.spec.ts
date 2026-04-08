import { expect, it, describe } from 'vitest';
import request from 'supertest';
import { app } from '../app.js';

describe('App Routes', () => {
  it('deve ser possível aceder à rota hello', async () => {
    // Aguarda o fastify estar pronto
    await app.ready();

    const response = await request(app.server).get('/hello');

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({
      message: 'Bem-vindo ao teu Backend de Finanças!',
    });
  });
});
