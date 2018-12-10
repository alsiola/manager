import { gql } from "apollo-server";
import { groupSchema } from "../group-schema";
import * as checkoutBranch from "./checkoutBranch";
import * as checkoutBranches from "./checkoutBranches";
import * as createFeature from "./createFeature";
import * as fetch from "./fetch";
import * as pull from "./pull";

const typeDef = gql`
    type Mutation {
        _empty: String
    }
`;

export const mutationSchema = groupSchema(
    { typeDef },
    checkoutBranch,
    checkoutBranches,
    createFeature,
    fetch,
    pull
);
