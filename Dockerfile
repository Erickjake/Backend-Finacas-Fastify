# 1. Usamos uma imagem leve do Node.js
FROM node:20-slim

# 2. Criamos a pasta da aplicação dentro do contentor
WORKDIR /usr/src/app

# 3. Copiamos os ficheiros de dependências
COPY package*.json ./

# 4. Instalamos as dependências
RUN npm install

# 5. Copiamos o resto do código
COPY . .

# 6. Geramos o cliente do Prisma (importante!)

# 7. Expomos a porta que o Fastify está a usar
EXPOSE 3333

# 8. Comando para iniciar a aplicação
CMD [ "npm", "run", "dev" ]