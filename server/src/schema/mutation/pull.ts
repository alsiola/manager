import { gql } from "apollo-server";
import { Resolver } from "../resolver";

const pull: Resolver<{}, { id: number; branch: string }> = async (
    _,
    { id, branch },
    { model }
) => {
    const repository = await model.repository.getRepository({ id });

    if (!repository) {
        return {
            success: false,
            message: "repository not found"
        };
    }

    const { path } = repository;

    return model.git
        .pull({ path, branch })
        .then(() => ({ success: true }))
        .catch(err => {
            console.error(err);
            return { success: false, message: err.message };
        });
};

export const typeDef = gql`
    type PullResponse {
        success: Boolean!
        message: String
    }

    extend type Mutation {
        pull(repo: String!, branch: String!): PullResponse
    }
`;

export const resolvers = { Mutation: { pull } };
