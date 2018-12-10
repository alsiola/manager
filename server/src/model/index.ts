import * as git from "./git";
import { feature } from "./feature";
import * as jira from "./jira";
import { repository } from "./repository";
import { Connection } from "typeorm";

export const model = (connection: Connection) => ({
    git,
    feature: feature(connection),
    jira,
    repository: repository(connection)
});
