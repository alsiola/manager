import { IFieldResolver, IResolvers, IResolverObject } from "graphql-tools";
import * as model from "../../model";
import { gql } from "apollo-server";

const checkoutBranch: IFieldResolver<
    {},
    {},
    { repo: string; branch: string }
> = (_, { repo, branch }) => {
    return model.checkoutBranch({ repo, branch });
};

export const typeDef = gql`
    extend type Mutation {
        checkoutBranch(repo: String!, branch: String!): Repository
    }
`;

export const resolvers = { Mutation: { checkoutBranch } };
