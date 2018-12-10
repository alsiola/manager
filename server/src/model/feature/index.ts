import { getManager, Connection } from "typeorm";
import { Feature, FeatureBranch } from "../../entities";
import { CreateFeatureArgs } from "../../schema/mutation/createFeature";
import { Repository } from "../../entities/Repository";

const createFeature = async ({
    name,
    issueCode,
    featureBranches
}: CreateFeatureArgs<Repository>) => {
    return getManager().transaction(async transaction => {
        const feature = await transaction.save(
            Feature.create({ name, issueCode })
        );

        await transaction.save(
            featureBranches.map(({ name, repository }) =>
                FeatureBranch.create({ name, repository, feature })
            )
        );

        return feature;
    });
};

const getAllFeatures = (connection: Connection) => async () => {
    const repository = await connection.getRepository(Feature);

    return repository.find();
};

const getFeature = (connection: Connection) => async ({
    id
}: {
    id: number;
}) => {
    const repository = await connection.getRepository(Feature);

    return repository.findOne({ id });
};

export const feature = (connection: Connection) => ({
    getFeature: getFeature(connection),
    getAllFeatures: getAllFeatures(connection),
    createFeature
});
