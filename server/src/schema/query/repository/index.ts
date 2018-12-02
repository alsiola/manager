import * as model from "../../../model";
import { gql, IFieldResolver } from "apollo-server";
import { SchemaSection } from "../../group-schema";
import { branches } from "./branches";
import { commits } from "./commits";
import { currentBranch } from "./currentBranch";
import { latestCommit } from "./latestCommit";
import { latestRelease } from "./latestRelease";
import { RepoObject } from "../../../model";

export const _repository: IFieldResolver<{}, {}, { name: string }> = (
    _,
    { name }
) => {
    return model.getRepository({ name }).catch(() => null);
};

export const typeDef = gql`
    extend type Query {
        repository(name: String!): Repository
    }

    type Commit {
        sha: String!
        author: String!
        message: String!
    }

    type Release {
        version: String!
        isMerged: Boolean!
    }

    type Repository {
        latestCommit: Commit
        latestRelease: Release
        commits(count: Int!): [Commit!]!
        currentBranch: String!
        name: String!
        branches: [String!]!
    }
`;

export const resolvers = {
    Query: {
        repository: _repository
    },
    Repository: {
        branches,
        commits,
        currentBranch,
        latestCommit,
        latestRelease
    }
};

export const repository: SchemaSection = {
    typeDef,
    resolvers
};
