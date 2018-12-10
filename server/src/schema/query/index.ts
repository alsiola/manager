import { feature } from "./feature";
import { repository } from "./repository";
import { gql } from "apollo-server";
import { groupSchema } from "../group-schema";
import { jira } from "./jira";

const baseSchema = gql`
    type Query {
        _empty: String
    }
`;

export const querySchema = groupSchema(
    { typeDef: baseSchema },
    feature,
    repository,
    jira
);
