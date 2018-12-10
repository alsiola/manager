import { gql } from "apollo-server";
import { SchemaSection } from "../../group-schema";
import { Resolver } from "../../resolver";

const _features: Resolver = (_, __, { model }) => {
    return model.feature.getAllFeatures();
};

const typeDef = gql`
    extend type Query {
        features: [Feature!]!
    }
`;

const resolvers = {
    Query: { features: _features }
};

export const features: SchemaSection = {
    typeDef,
    resolvers
};
