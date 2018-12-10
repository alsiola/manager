import { Connection, FindConditions, FindManyOptions } from "typeorm";
import { Repository } from "../../entities/Repository";
import { CreateRepositoryArgs } from "../../schema/mutation/createRepository";

export const createRepository = (connection: Connection) => ({
    name,
    path
}: CreateRepositoryArgs) => {
    return connection.getRepository(Repository).save(
        Repository.create({
            name,
            path
        })
    );
};

export const getRepositories = (connection: Connection) => (
    conditions?: FindManyOptions<Repository>
) => {
    return connection.getRepository(Repository).find(conditions);
};

export const getRepository = (connection: Connection) => (
    conditions?: FindConditions<Repository>
) => {
    return connection.getRepository(Repository).findOne(conditions);
};

export const repository = (connection: Connection) => ({
    getRepository: getRepository(connection),
    getRepositories: getRepositories(connection),
    createRepository: createRepository(connection)
});
