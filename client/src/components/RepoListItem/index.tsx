import React from "react";
import { Label, List } from "semantic-ui-react";
import { Repository } from "../../queries/Repository";

interface RepositoryProps {
    onSelected: () => void;
    id: number;
}

export const RepoListItem: React.SFC<RepositoryProps> = ({
    id,
    onSelected
}) => (
    <Repository id={id}>
        {({ repository: { name, currentBranch } }) => {
            return (
                <List.Item onClick={onSelected}>
                    <List.Icon
                        name="bitbucket"
                        size="large"
                        verticalAlign="middle"
                    />
                    <List.Content>
                        <List.Header as="span">
                            {name}
                            <Label as="span" pointing="left" color="orange">
                                {currentBranch}
                            </Label>
                        </List.Header>
                    </List.Content>
                </List.Item>
            );
        }}
    </Repository>
);
