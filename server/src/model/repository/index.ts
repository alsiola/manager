import { Connection, FindConditions, FindManyOptions } from "typeorm";
import { Repository } from "../../entities/Repository";
import { CreateRepositoryArgs } from "../../schema/mutation/createRepository";

export const createRepository = async (
    connection: Connection,
    { name, path }: CreateRepositoryArgs
) => {
    return connection.getRepository(Repository).create(
        Repository.create({
            name,
            path
        })
    );
};

export const getRepositories = async (
    connection: Connection,
    conditions?: FindManyOptions<Repository>
) => {
    return connection.getRepository(Repository).find(conditions);
};

export const getRepository = async (
    connection: Connection,
    conditions?: FindConditions<Repository>
) => {
    return connection.getRepository(Repository).findOne(conditions);
};
