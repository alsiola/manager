# manager

A tool to run locally to manage git branches while working on several microservices.

Massively WIP, but the idea is to define a feature with specific branches in specific repos. When starting work on that feature, the correct branches will be checked out for you in all repositories.

Goals are to be fully-typed from top to bottom, with axiomatic GraphQL in server and client with type generation.  Type generation from the DB (postgres with TypeORM) is a goal.

## Make it run
First, get a postgres server running. Use the included docker-compose.yml if you like:

```
docker-compose up -d
```

Create the file `server/ormconfig.json` containing connection information, e.g.

```
{
    "type": "postgres",
    "host": "localhost",
    "port": 5432,
    "username": "postgres",
    "password": "postgres",
    "database": "manager",
    "synchronize": true,
    "logging": false,
    "entities": ["lib/entities/**/*.js"],
    "migrations": ["lib/migration/**/*.js"],
    "subscribers": ["lib/subscriber/**/*.js"],
    "cli": {
        "entitiesDir": "src/entity",
        "migrationsDir": "src/migration",
        "subscribersDir": "src/subscriber"
    }
}
```

Create an env file in `server/.env` if you want to use apollo engine, with the content:

```
ENGINE_API_KEY=<YOUR API KEY>
```

Now run the backend:

```
cd server && tsc && node lib
```

and the frontend:

```
cd client && yarn start
```