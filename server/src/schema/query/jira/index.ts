import * as model from "../../../model";
import { gql } from "apollo-server";
import { SchemaSection } from "../../group-schema";
import { Resolver } from "../../resolver";

export const issue: Resolver<{}, { issueCode: string }> = (
    _,
    { issueCode }
) => {
    return model.jira.getIssue({ issueCode });
};

export const typeDef = gql`
    extend type Query {
        issue(issueCode: String!): Issue
    }

    type Issue {
        issueCode: String!
        status: String!
        description: String!
        comment: [Comment!]!
    }

    type Comment {
        author: String!
        body: String!
        created: String!
    }
`;

export const resolvers = {
    Query: {
        issue
    }
};

export const jira: SchemaSection = {
    typeDef,
    resolvers
};
