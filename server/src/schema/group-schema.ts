import { DocumentNode } from "graphql";
import { IResolvers } from "graphql-tools";
import { compact, merge } from "lodash";

export interface SchemaSection {
    typeDef: DocumentNode;
    resolvers: any;
}

export interface SchemaGroup {
    typeDefs: DocumentNode[];
    resolvers: IResolvers;
}

export const groupSchema = (
    ...sections: Array<Partial<SchemaSection>>
): SchemaGroup => ({
    typeDefs: compact(sections.map(({ typeDef }) => typeDef)),
    resolvers: merge.apply(null, sections.map(({ resolvers }) => resolvers))
});
