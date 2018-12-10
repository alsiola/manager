import { git } from "../../../model";
import { Repository } from "../../../entities/Repository";
import { Resolver } from "../../resolver";
import { SchemaSection } from "../../group-schema";
import { gql } from "apollo-server";

const _latestCommit: Resolver<Repository> = ({ path }) => {
    return git.getLatestCommit(path);
};

export const typeDef = gql`
    extend type Repository {
        latestCommit: Commit
    }
`;

export const resolvers = {
    Repository: {
        latestCommit: _latestCommit
    }
};

export const latestCommit: SchemaSection = {
    typeDef,
    resolvers
};
