import { gql } from "apollo-server";
import { Resolver } from "../resolver";

const checkoutBranch: Resolver<{}, { id: number; branch: string }> = async (
    _,
    { id, branch },
    { connection, model }
) => {
    const repository = await model.repository.getRepository(connection, {
        id
    });

    if (!repository) {
        return {
            success: false,
            message: "repository not found"
        };
    }

    const { path } = repository;

    return model.git
        .checkoutBranch({ path, branch })
        .then(() => ({
            success: true,
            repository
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
    type CheckoutBranchResponse {
        success: Boolean!
        message: String
        repository: Repository
    }

    extend type Mutation {
        checkoutBranch(id: Int!, branch: String!): CheckoutBranchResponse!
    }
`;

export const resolvers = { Mutation: { checkoutBranch } };
