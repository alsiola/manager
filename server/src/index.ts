import { ApolloServer } from "apollo-server";

import "reflect-metadata";
import { createConnection, Connection } from "typeorm";
import { schema } from "./schema";

export interface Ctx {
    connection: Connection;
}

createConnection().then(connection => {
    const server = new ApolloServer({
        schema,
        context: { connection }
    });

    server.listen().then(() => {
        console.log(`🚀  Server ready at http://localhost:4000`);
    });
});
