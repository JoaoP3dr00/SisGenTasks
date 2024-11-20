# imagem do node mais recente
FROM node:latest

# diretório acessado no container
WORKDIR /usr/SIS-GEN-TASK

# copiando todos os arquivos do diretório atual para o do container
COPY . .

# instalando as dependências
RUN yarn install --quiet --no-optional --no-fund --loglevel=error

# gerando os arquivos de build e aplicando as migrações do Prisma
RUN yarn build

# expondo a porta que a aplicação irá utilizar
EXPOSE 2504

# comando para executar a aplicação em modo de desenvolvimento
CMD ["yarn", "start:dev"]