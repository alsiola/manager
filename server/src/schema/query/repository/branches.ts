import { Repository } from "../../../entities/Repository";
import { Resolver } from "../../resolver";
import { gql } from "apollo-server";
import { SchemaSection } from "../../group-schema";

const _branches: Resolver<Repository, {}> = ({ path }, args, { model }) => {
    return model.git.getBranches(path);
};

export const typeDef = gql`
    extend type Repository {
        branches: [String!]!
    }
`;

export const resolvers = {
    Repository: {
        branches: _branches
    }
};

export const branches: SchemaSection = {
    typeDef,
    resolvers
};
