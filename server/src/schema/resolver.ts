import { IFieldResolver } from "graphql-tools";
import { Ctx } from "..";

export type Resolver<TSource = {}, TArgs = {}> = IFieldResolver<
    TSource,
    Ctx,
    TArgs
>;
