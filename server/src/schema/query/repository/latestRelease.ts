import { Repository } from "../../../entities/Repository";
import { Resolver } from "../../resolver";
import { gql } from "apollo-server";
import { SchemaSection } from "../../group-schema";

const _latestRelease: Resolver<Repository> = ({ path }, args, { model }) => {
    return model.git.getLatestRelease(path);
};

export const typeDef = gql`
    type Release {
        version: String!
        isMerged: Boolean!
    }

    extend type Repository {
        latestRelease: Release
    }
`;

export const resolvers = {
    Repository: {
        latestRelease: _latestRelease
    }
};

export const latestRelease: SchemaSection = {
    typeDef,
    resolvers
};
