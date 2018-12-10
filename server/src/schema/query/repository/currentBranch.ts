import { Repository } from "../../../entities/Repository";
import { Resolver } from "../../resolver";
import { SchemaSection } from "../../group-schema";
import { gql } from "apollo-server";

const _currentBranch: Resolver<Repository> = ({ path }, args, { model }) => {
    return model.git.getCurrentBranchname(path);
};

export const typeDef = gql`
    extend type Repository {
        currentBranch: String!
    }
`;

export const resolvers = {
    Repository: {
        currentBranch: _currentBranch
    }
};

export const currentBranch: SchemaSection = {
    typeDef,
    resolvers
};
