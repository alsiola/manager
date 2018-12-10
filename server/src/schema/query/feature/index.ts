import { gql } from "apollo-server";
import { groupSchema } from "../../group-schema";
import { Resolver } from "../../resolver";
import * as jira from "../jira";
import { feature as _feature } from "./feature";
import { features } from "./features";

const _issue: Resolver<{ issueCode: string }> = async (
    { issueCode },
    __,
    ctx,
    info
) => {
    return jira.issue({}, { issueCode }, ctx, info);
};

const typeDef = gql`
    type FeatureBranch {
        id: Int!
        repository: Repository!
        name: String!
    }

    type Feature {
        id: Int!
        name: String!
        branches: [FeatureBranch!]!
        issue: Issue
    }
`;

const resolvers = { Feature: { issue: _issue } };

export const feature = groupSchema({ typeDef, resolvers }, _feature, features);
