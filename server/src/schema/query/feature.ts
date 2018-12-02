import { IFieldResolver } from "graphql-tools";
import { Ctx } from "../..";
import * as model from "../../model";
import { gql } from "apollo-server";
import { SchemaSection } from "../group-schema";

const _feature: IFieldResolver<{}, Ctx, { id: number }> = async (
    _,
    { id },
    { connection }
) => {
    const feature = await model.getFeature(connection, { id });

    if (!feature) {
        return null;
    }

    return {
        ...feature,
        branches: await Promise.all(
            feature.branches.map(async featureBranch => ({
                ...featureBranch,
                repository: await model.getRepository({
                    name: featureBranch.repository
                })
            }))
        )
    };
};

const typeDef = gql`
    extend type Query {
        feature(id: Int!): Feature
    }
`;

const resolvers = { Query: { feature: _feature } };

export const feature: SchemaSection = {
    typeDef,
    resolvers
};
