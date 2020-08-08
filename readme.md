# Backend GoBarber (Bootcamp GoStack)

> Backend em desenvolvimento no curso Bootcamp GoStack, feito com nodejs, express e typescript!

## Testando a aplicação:

> Você pode realizar o clone deste repositório ou baixar o arquivo .zip

### Clone este repositório:

````
git clone https://github.com/huriellopes/backend-gobarber.git
````
Para baixar o zip: https://github.com/huriellopes/backend-gobarber/archive/master.zip

## ⚡ Executando o projeto

### Na raiz do projeto, execute o comando:

````
yarn ou npm install
````

### Configure o .env, para isso execute o comando:

````
copy .env.example .env ou cp .env.example .env
````
> Em seguida configure o .env!

### Para usar banco de dados, temos duas opções, docker ou local:

Caso for utilizar docker, rode os sequintes comandos:

````
# Container do PostgreSQL, altere **POSTGRES_PASSWORD=senha** para a senha desejada
docker run --name gostack_postgres -e POSTGRES_PASSWORD=senha -p 5432:5432 -d postgres

# Container do mongodb
docker run --name mongodb -p 27017:27017 -d -t mongo

# Container do Redis
docker run --name redis -p 6379:6379 -d -t redis:alpine
````

> Depois dos containers criados e startados, abra o postgreSQL em um Sgbd e crie um banco chamado **gostack_gobarber**.

Depois crie um arquivo chamado **ormconfig.json** e configure da seguinte forma:

````
[
  {
    "name": "default",
    "type": "postgres",
    "host": "localhost",
    "port": 5432,
    "username": "postgres",
    "password": "senha_do_banco",
    "database": "gostack_gobarber",
    "entities": [
        "./src/modules/**/infra/typeorm/entities/*.ts"
    ],
    "migrations": [
        "./src/shared/infra/typeorm/migrations/*.ts"
    ],
    "cli": {
      "migrationsDir": "./src/shared/ingra/typeorm/migrations"
    }
  },
  {
    "name": "mongo",
    "type": "mongodb",
    "host": "localhost",
    "port": 27017,
    "database": "gobarber",
    "useUnifiedTopology": true,
    "entities": [
        "./src/modules/**/infra/typeorm/schemas/*.ts"
    ]
  }
]
````

Em seguida rode o seguinte comando para as migrations:

````
yarn typeorm migration:run ou npm typeorm migration:run
````

Caso precise desfazer as migrações, execute o seguinte comando:

````
yarn typeorm migration:revert ou npm typeorm migration:revert
````

## 🚀 Rodando o servidor

### Para rodar o servidor, execute o comando:

````
yarn dev:server
````

> Para ter certeza que o projeto está rodando, abra o navegador e execute o seguinte link: http://localhost:3000 (após o `:` com a porta que configurou no .env)

## 📝 Licença

Este repositório está sob a linceça MIT. Veja aqui [Licença](LICENCE)
