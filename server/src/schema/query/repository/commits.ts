import { IFieldResolver } from "graphql-tools";
import * as model from "../../../model";
import { RepoObject } from "../../../model";

export const commits: IFieldResolver<RepoObject, void, { count: number }> = (
    { repo },
    { count }
) => {
    return model.getBranchHistory({ count })(repo);
};
