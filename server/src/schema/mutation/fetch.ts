import * as model from "../../model";
import { gql } from "apollo-server";
import { Resolver } from "../resolver";

const fetch: Resolver<{}, { id: number }> = async (
    _,
    { id },
    { connection }
) => {
    const repository = await model.repository.getRepository(connection, { id });

    if (!repository) {
        return {
            success: false,
            message: "repository not found"
        };
    }

    return model.git
        .fetch(repository.path)
        .then(() => ({ success: true }))
        .catch(err => {
            console.error(err);
            return { success: false, message: err.message };
        });
};

export const typeDef = gql`
    type FetchResponse {
        success: Boolean!
        message: String
    }
    extend type Mutation {
        fetch(id: Int!): FetchResponse!
    }
`;

export const resolvers = { Mutation: { fetch } };
