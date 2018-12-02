import { IFieldResolver, IResolverObject } from "graphql-tools";
import { Ctx } from "../..";

import * as model from "../../model";
import { gql } from "apollo-server";

export interface FeatureBranchInput {
    name: string;
    repository: string;
}

export interface CreateFeatureArgs {
    name: string;
    featureBranches: FeatureBranchInput[];
}

const createFeature: IFieldResolver<{}, Ctx, CreateFeatureArgs> = async (
    _,
    { name, featureBranches }
) => {
    return model.createFeature({ name, featureBranches });
};

export const typeDef = gql`
    input FeatureBranchInput {
        repository: String!
        name: String!
    }

    extend type Mutation {
        createFeature(
            name: String!
            featureBranches: [FeatureBranchInput!]!
        ): Feature
    }
`;

export const resolvers = {
    Mutation: { createFeature }
};
