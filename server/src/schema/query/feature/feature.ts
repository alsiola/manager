import { gql } from "apollo-server";
import { SchemaSection } from "../../group-schema";
import { Resolver } from "../../resolver";

const _feature: Resolver<{}, { id: number }> = (_, { id }, { model }) => {
    return model.feature.getFeature({ id });
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
