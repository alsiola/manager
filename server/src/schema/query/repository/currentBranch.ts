import { IFieldResolver } from "graphql-tools";
import * as model from "../../../model";
import { Ctx } from "../../..";

export const currentBranch: IFieldResolver<model.RepoObject, Ctx> = ({
    repo
}) => {
    return model.getCurrentBranchname(repo);
};
