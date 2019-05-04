# ApI Marketplace

API REST para Marketplace. Módulo 3 do Curso Bootcamp da Rocketseat.

## Rodando a aplicação

Para rodar o projeto será necessário instalar as seguintes aplicações:

- Docker
- Node
- Yarn (Opcional)

### Passo a passo

#### Subindo a base de dados:

```sh
docker run --name mongonode -p 27017:27017 -d mongo
```

#### Subindo Redis

```sh
docker run --name noderedis -p 6379:6379 -d -t redis:alpine
```

#### Instalando as dependências.

```
yarn install
```

#### Configurando Ambiente

Criar um arquivo _.env_ e atualizar com as informações referente ao ambiente.

#### Iniciando o projeto:

```
yarn start
```

[Acesse aqui](http://localhost:3000)
