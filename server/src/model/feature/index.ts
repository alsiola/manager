import "reflect-metadata";
import { getManager, Connection } from "typeorm";
import { Feature, FeatureBranch } from "../../entities";
import { CreateFeatureArgs } from "../../schema/mutation/createFeature";

export const createFeature = async ({
    name,
    featureBranches
}: CreateFeatureArgs) => {
    return getManager().transaction(async transaction => {
        const feature = await transaction.save(Feature.create({ name }));

        await transaction.save(
            featureBranches.map(({ name, repository }) =>
                FeatureBranch.create({ name, repository, feature })
            )
        );

        return feature;
    });
};

export const getAllFeatures = async (connection: Connection) => {
    const repository = await connection.getRepository(Feature);

    return repository.find();
};

export const getFeature = async (
    connection: Connection,
    { id }: { id: number }
) => {
    const repository = await connection.getRepository(Feature);

    return repository.findOne({ id });
};
