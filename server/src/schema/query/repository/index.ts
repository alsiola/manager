import { gql } from "apollo-server";
import { groupSchema } from "../../group-schema";
import { commits } from "./commits";
import { currentBranch } from "./currentBranch";
import { latestCommit } from "./latestCommit";
import { latestRelease } from "./latestRelease";
import { branches } from "./branches";
import { Resolver } from "../../resolver";

export const _repository: Resolver<{}, { id: number }> = (
    _,
    { id },
    { model }
) => {
    return model.repository.getRepository({ id });
};

const _repositories: Resolver = async (_, __, { model }) => {
    return model.repository.getRepositories();
};

export const typeDef = gql`
    extend type Query {
        repository(id: Int!): Repository
        repositories: [Repository!]!
    }

    type Commit {
        sha: String!
        author: String!
        message: String!
    }

    type Repository {
        id: Int!
        name: String!
    }
`;

export const resolvers = {
    Query: {
        repository: _repository,
        repositories: _repositories
    }
};

export const repository = groupSchema(
    {
        typeDef,
        resolvers
    },
    branches,
    commits,
    currentBranch,
    latestCommit,
    latestRelease
);
