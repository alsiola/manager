import { IFieldResolver } from "graphql-tools";
import * as model from "../../../model";
import { Ctx } from "../../..";

export const latestCommit: IFieldResolver<model.RepoObject, Ctx> = ({
    repo
}) => {
    return model.getLatestCommit(repo);
};
