import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { createConnection, Connection } from "typeorm";
import { schema } from "./schema";
import dotenv from "dotenv";

dotenv.config();

export interface Ctx {
    connection: Connection;
}

createConnection().then(connection => {
    const server = new ApolloServer({
        schema,
        context: { connection },
        engine: {
            apiKey: process.env.ENGINE_API_KEY
        }
    });

    server.listen(4000).then(() => {
        console.log(`🚀  Server ready at http://localhost:4000`);
    });
});
