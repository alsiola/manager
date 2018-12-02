import * as model from "../../model";
import { gql } from "apollo-server";
import { SchemaSection } from "../group-schema";

const _repositories = model.getRepositories;

const typeDef = gql`
    extend type Query {
        repositories: [Repository!]!
    }
`;

const resolvers = { Query: { repositories: _repositories } };

export const repositories: SchemaSection = {
    typeDef,
    resolvers
};
