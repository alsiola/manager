import * as model from "../../../model";
import { gql, IFieldResolver } from "apollo-server";
import { groupSchema } from "../../group-schema";
import { commits } from "./commits";
import { currentBranch } from "./currentBranch";
import { latestCommit } from "./latestCommit";
import { latestRelease } from "./latestRelease";
import { Ctx } from "../../..";
import { branches } from "./branches";

export const _repository: IFieldResolver<{}, Ctx, { id: number }> = (
    _,
    { id },
    { connection }
) => {
    return model.repository.getRepository(connection, { id });
};

const _repositories: IFieldResolver<{}, Ctx> = async (
    _,
    __,
    { connection }
) => {
    return model.repository.getRepositories(connection);
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
