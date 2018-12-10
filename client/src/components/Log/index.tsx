import React from "react";
import { Feed, Icon, List, Header } from "semantic-ui-react";
import { Repository_repository_commits } from "../RepoView/__generated__/Repository";

interface LogProps {
    commits: Repository_repository_commits[];
}

export const Log: React.SFC<LogProps> = ({ commits }) => (
    <>
        <Header as="h2">Log</Header>
        <Feed>
            {commits.map(({ author, message, sha }) => (
                <Feed.Event key={sha}>
                    <Feed.Label>
                        <Icon name="code" />
                    </Feed.Label>
                    <Feed.Content>
                        <Feed.Summary>
                            <Feed.User>
                                {author} - {message.split("\n")[0]}
                            </Feed.User>
                        </Feed.Summary>
                        <Feed.Extra text>
                            {message
                                .split("\n")
                                .slice(1)
                                .map((msg, i) => (
                                    <Feed.Summary key={i}>{msg}</Feed.Summary>
                                ))}
                        </Feed.Extra>
                    </Feed.Content>
                </Feed.Event>
            ))}
        </Feed>
    </>
);
