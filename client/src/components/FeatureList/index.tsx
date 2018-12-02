import gql from "graphql-tag";
import { Query } from "react-apollo";
import React from "react";
import { Features } from "./__generated__/Features";
import { RepoListItem } from "../RepoListItem";
import { Item, Header } from "semantic-ui-react";
import { FeatureListItem } from "../FeatureListItem";

const GET_FEATURES = gql`
    query Features {
        features {
            id
        }
    }
`;

export const FeatureList: React.SFC<{}> = () => (
    <>
        <Header>Features</Header>
        <Query<Features> query={GET_FEATURES}>
            {({ loading, error, data }) => {
                if (error) return `Error! ${error.message}`;
                if (loading || !data) return "Loading...";

                return (
                    <Item.Group divided>
                        {data.features.map(({ id }) => (
                            <FeatureListItem
                                key={id}
                                onSelected={console.log}
                                id={id}
                            />
                        ))}
                    </Item.Group>
                );
            }}
        </Query>
    </>
);
