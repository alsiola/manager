import { IFieldResolver } from "graphql-tools";
import * as model from "../../../model";
import { Ctx } from "../../..";

export const latestRelease: IFieldResolver<model.RepoObject, Ctx> = ({
    repo
}) => {
    return model.getLatestRelease(repo);
};
