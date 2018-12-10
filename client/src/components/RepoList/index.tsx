import React from "react";
import { RepoListItem } from "../RepoListItem";
import { Header, List } from "semantic-ui-react";
import { Repositories } from "../../queries/Repositories";

interface RepoListProps {
    setRepo: (repo: { id: number; name: string }) => void;
}

export const RepoList: React.SFC<RepoListProps> = ({ setRepo }) => (
    <>
        <Header>Repositories</Header>
        <Repositories>
            {({ repositories }) => (
                <List divided relaxed>
                    {repositories.map(({ id, name }) => (
                        <RepoListItem
                            key={id}
                            id={id}
                            onSelected={() => setRepo({ id, name })}
                        />
                    ))}
                </List>
            )}
        </Repositories>
    </>
);
