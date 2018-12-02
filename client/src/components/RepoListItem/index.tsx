import React from "react";
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import {
    Repository as RepositoryResponse,
    RepositoryVariables
} from "./__generated__/Repository";
import { Item, Button } from "semantic-ui-react";

const GET_REPO = gql`
    query Repository($name: String!) {
        repository(name: $name) {
            name
            currentBranch
            branches
        }
    }
`;

interface RepositoryProps {
    onSelected: () => void;
}

export const RepoListItem: React.SFC<RepositoryVariables & RepositoryProps> = ({
    name,
    onSelected
}) => (
    <Query<RepositoryResponse, RepositoryVariables>
        query={GET_REPO}
        variables={{ name }}
    >
        {({ loading, error, data }) => {
            if (error) return `Error! ${error.message}`;
            if (loading || !data) return "Loading...";

            if (!data.repository) return "Repository not found";

            const {
                repository: { name, currentBranch, branches }
            } = data;

            return (
                <Item>
                    <Item.Content>
                        <Item.Header>{name}</Item.Header>
                        <Item.Description>
                            Current branch: {currentBranch}
                        </Item.Description>
                        <Item.Extra>
                            <Button onClick={onSelected}>View</Button>
                        </Item.Extra>
                    </Item.Content>
                </Item>
            );
        }}
    </Query>
);
