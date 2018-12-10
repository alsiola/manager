import gql from "graphql-tag";
import { Query } from "react-apollo";
import React from "react";
import { Features } from "./__generated__/Features";
import { Header, Button, List } from "semantic-ui-react";
import { FeatureListItem } from "../FeatureListItem";
import { Link } from "@reach/router";

export const GET_FEATURES = gql`
    query Features {
        features {
            id
            name
        }
    }
`;

interface FeatureListProps {
    setFeature: (args: { title: string; id: number }) => void;
}

export const FeatureList: React.SFC<FeatureListProps> = ({ setFeature }) => (
    <>
        <Header>Features</Header>
        <Link to="/feature/create">
            <Button>Add Feature</Button>
        </Link>
        <Link to="/connect/jira">
            <Button>Connext to JIRA</Button>
        </Link>
        <Query<Features> query={GET_FEATURES}>
            {({ loading, error, data }) => {
                if (error) return `Error! ${error.message}`;
                if (loading || !data) return "Loading...";

                return (
                    <List relaxed divided>
                        {data.features.map(({ id, name }) => (
                            <FeatureListItem
                                key={id}
                                onSelected={() =>
                                    setFeature({ id, title: name })
                                }
                                name={name}
                            />
                        ))}
                    </List>
                );
            }}
        </Query>
    </>
);
