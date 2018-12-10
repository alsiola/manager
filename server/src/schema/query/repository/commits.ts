import { Repository } from "../../../entities/Repository";
import { Resolver } from "../../resolver";
import { gql } from "apollo-server";
import { SchemaSection } from "../../group-schema";

const _commits: Resolver<Repository, { count: number }> = (
    { path },
    { count },
    { model }
) => {
    return model.git.getBranchHistory({ count, path });
};

export const typeDef = gql`
    extend type Repository {
        commits(count: Int!): [Commit!]!
    }
`;

export const resolvers = {
    Repository: {
        commits: _commits
    }
};

export const commits: SchemaSection = {
    typeDef,
    resolvers
};
