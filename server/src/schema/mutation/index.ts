import * as checkoutBranch from "./checkoutBranch";
import * as createFeature from "./createFeature";
import { makeExecutableSchema } from "graphql-tools";
import { gql } from "apollo-server";
import { groupSchema } from "../group-schema";

const typeDef = gql`
    type Mutation {
        _empty: String
    }
`;

export const mutationSchema = groupSchema(
    { typeDef },
    checkoutBranch,
    createFeature
);
