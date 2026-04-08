FROM node:22-slim

# ESTA LINHA É O SEGREDO: Instala as bibliotecas de segurança
RUN apt-get update -y && apt-get install -y openssl libssl-dev ca-certificates

WORKDIR /usr/src/app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install

COPY . .

# Gera o cliente já com as bibliotecas instaladas
RUN npx prisma generate

EXPOSE 3333

CMD [ "npm", "run", "dev" ]