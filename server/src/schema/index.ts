import { makeExecutableSchema } from "graphql-tools";
import { querySchema } from "./query";
import { mutationSchema } from "./mutation";
import { merge } from "lodash";

export const schema = makeExecutableSchema({
    typeDefs: [...querySchema.typeDefs, ...mutationSchema.typeDefs],
    resolvers: merge.apply(null, [
        querySchema.resolvers,
        mutationSchema.resolvers
    ])
});
