import { IFieldResolver } from "graphql-tools";
import { Ctx } from "../..";
import * as model from "../../model";
import { gql } from "apollo-server";
import { SchemaSection } from "../group-schema";

const _features: IFieldResolver<{}, Ctx> = async (_, __, { connection }) => {
    const features = await model.getAllFeatures(connection);

    return Promise.all(
        features.map(async feature => ({
            ...feature,
            branches: await Promise.all(
                feature.branches.map(async featureBranch => ({
                    ...featureBranch,
                    repository: await model.getRepository({
                        name: featureBranch.repository
                    })
                }))
            )
        }))
    );
};

const typeDef = gql`
    type FeatureBranch {
        id: Int!
        repository: Repository!
        name: String!
    }

    type Feature {
        id: Int!
        name: String!
        branches: [FeatureBranch!]!
    }

    extend type Query {
        features: [Feature!]!
    }
`;

const resolvers = { Query: { features: _features } };

export const features: SchemaSection = {
    typeDef,
    resolvers
};
