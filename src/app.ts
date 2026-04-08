import fastify from 'fastify';
// Importa aqui as tuas futuras rotas

export const app = fastify();

app.get('/hello', async () => {
  return { message: 'Bem-vindo ao teu Backend de Finanças!' };
});
