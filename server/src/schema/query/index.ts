import { feature } from "./feature";
import { features } from "./features";
import { repositories } from "./repositories";
import { repository } from "./repository";
import { gql } from "apollo-server";
import { groupSchema } from "../group-schema";

const baseSchema = gql`
    type Query {
        _empty: String
    }
`;

export const querySchema = groupSchema(
    { typeDef: baseSchema },
    feature,
    features,
    repositories,
    repository
);
