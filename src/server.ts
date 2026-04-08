import fastify from "fastify";

// 1. Criamos a nossa aplicação (servidor)
const app = fastify();

// 2. Criamos a nossa primeira "rota" (o caminho que o navegador vai aceder)
app.get("/hello", async () => {
  return { message: "Bem-vindo ao teu Backend de Finanças!" };
});

// 3. Ligamos o servidor na porta 3333
app.listen({ port: 3333 }).then(() => {
  console.log("🚀 Servidor de Finanças a correr em http://localhost:3333");
});
