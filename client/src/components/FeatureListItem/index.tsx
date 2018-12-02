import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { Item, Button } from "semantic-ui-react";
import {
    FeatureVariables,
    Feature as FeatureResponse
} from "./__generated__/Feature";

export const GET_FEATURE = gql`
    query Feature($id: Int!) {
        feature(id: $id) {
            id
            name
            branches {
                id
                name
                repository {
                    name
                }
            }
        }
    }
`;

interface FeatureProps {
    onSelected: () => void;
}

export const FeatureListItem: React.SFC<FeatureVariables & FeatureProps> = ({
    id,
    onSelected
}) => (
    <Query<FeatureResponse, FeatureVariables>
        query={GET_FEATURE}
        variables={{ id }}
    >
        {({ loading, error, data }) => {
            if (error) return `Error! ${error.message}`;
            if (loading || !data) return "Loading...";

            if (!data.feature) return "Repository not found";

            const {
                feature: { name, branches }
            } = data;

            return (
                <Item>
                    <Item.Content>
                        <Item.Header>{name}</Item.Header>
                        {branches.map(
                            ({ name, repository: { name: repoName } }) => (
                                <Item.Extra key={`${repoName}-${name}`}>
                                    {repoName}: {name}
                                </Item.Extra>
                            )
                        )}
                    </Item.Content>
                </Item>
            );
        }}
    </Query>
);
