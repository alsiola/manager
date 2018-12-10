import { gql } from "apollo-server";
import { Resolver } from "../resolver";

export interface CreateRepositoryArgs {
    name: string;
    path: string;
}

const createRepository: Resolver<{}, CreateRepositoryArgs> = async (
    _,
    { name, path },
    { connection, model }
) => {
    return model.repository
        .createRepository(connection, { name, path })
        .then(() => ({
            success: true
        }))
        .catch(err => {
            console.error(err);
            return {
                success: false,
                message: err.message
            };
        });
};

export const typeDef = gql`
    type CreateRepositoryResponse {
        success: Boolean!
        message: String
    }

    extend type Mutation {
        createRepository(
            name: String!
            path: String!
        ): CreateRepositoryResponse!
    }
`;

export const resolvers = {
    Mutation: { createRepository }
};
