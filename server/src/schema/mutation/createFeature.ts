import { gql } from "apollo-server";
import { In } from "typeorm";
import R from "ramda";
import { Resolver } from "../resolver";

export interface FeatureBranchInput<T> {
    name: string;
    repository: T;
}

export interface CreateFeatureArgs<T = number> {
    name: string;
    issueCode: string;
    featureBranches: FeatureBranchInput<T>[];
}

const createFeature: Resolver<{}, CreateFeatureArgs> = async (
    _,
    { name, issueCode, featureBranches },
    { connection, model }
) => {
    const repositories = await model.repository.getRepositories(connection, {
        where: {
            id: In(featureBranches.map(R.prop("repository")))
        }
    });

    const missing = featureBranches.filter(
        ({ repository: repoId }) =>
            !repositories.some(repository => repository.id === repoId)
    );

    if (missing.length > 0) {
        return {
            success: false,
            message: `Missing repository ids: ${missing
                .map(R.prop("repository"))
                .join(", ")}`
        };
    }

    return model.feature
        .createFeature({
            name,
            issueCode,
            featureBranches: featureBranches.map(
                ({ repository, ...featureBranch }) => ({
                    ...featureBranch,
                    repository: repositories.find(
                        R.pipe(
                            R.prop("id"),
                            R.equals(repository)
                        )
                    )!
                })
            )
        })
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
    input FeatureBranchInput {
        repository: Int!
        name: String!
    }

    type CreateFeatureResponse {
        success: Boolean!
        message: String
    }

    extend type Mutation {
        createFeature(
            name: String!
            issueCode: String!
            featureBranches: [FeatureBranchInput!]!
        ): CreateFeatureResponse!
    }
`;

export const resolvers = {
    Mutation: { createFeature }
};
