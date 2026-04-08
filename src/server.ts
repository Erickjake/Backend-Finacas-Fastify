import 'dotenv/config'; // <-- ADICIONA ESTA LINHA NO TOPO!
import { app } from './app.js';

app
  .listen({
    port: 3333,
    host: '0.0.0.0',
  })
  .then(() => {
    console.log('🚀 Servidor a correr dentro do Docker na porta 3333!');
  })
  .catch(err => {
    // Adiciona este bloco catch para se o servidor falhar, vermos o erro!
    console.error('Erro ao arrancar o servidor:', err);
    process.exit(1);
  });
