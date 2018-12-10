import * as model from "../../model";
import { gql } from "apollo-server";
import { In } from "typeorm";
import R from "ramda";
import { Resolver } from "../resolver";

const checkoutBranches: Resolver<
    {},
    { branches: Array<{ id: number; branch: string }> }
> = async (_, { branches }, { connection }) => {
    const repositories = await model.repository.getRepositories(connection, {
        where: {
            id: In(branches.map(R.prop("id")))
        }
    });

    const missing = branches.filter(
        ({ id }) => !repositories.some(repository => repository.id === id)
    );

    if (missing.length > 0) {
        return {
            success: false,
            message: `Missing repository ids: ${missing
                .map(R.prop("id"))
                .join(", ")}`
        };
    }

    return Promise.all(
        branches.map(({ id, branch }) =>
            model.git.checkoutBranch({
                branch,
                path: repositories.find(({ id: dbId }) => id === dbId)!.path
            })
        )
    )
        .then(() => ({
            success: true,
            repositories
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
    type CheckoutBranchesResponse {
        success: Boolean!
        message: String
        repositories: [Repository!]
    }

    input CheckoutBranchesInput {
        id: Int!
        branch: String!
    }

    extend type Mutation {
        checkoutBranches(
            branches: [CheckoutBranchesInput!]!
        ): CheckoutBranchesResponse!
    }
`;

export const resolvers = { Mutation: { checkoutBranches } };
