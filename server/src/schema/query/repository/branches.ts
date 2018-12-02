import { IFieldResolver } from "graphql-tools";
import * as model from "../../../model";
import { RepoObject } from "../../../model";

export const branches: IFieldResolver<RepoObject, {}> = ({ repo }) => {
    return model.getBranches(repo);
};
