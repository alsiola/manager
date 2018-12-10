import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { Header, List, Button } from "semantic-ui-react";
import { FeatureVariables, Feature } from "./__generated__/Feature";
import { CheckoutBranches } from "../../mutations/CheckoutBranches";

const GET_FEATURE = gql`
    query Feature($id: Int!) {
        feature(id: $id) {
            id
            name
            branches {
                id
                name
                repository {
                    id
                    name
                    currentBranch
                }
            }
        }
    }
`;

export const FeatureView: React.SFC<FeatureVariables> = ({ id }) => {
    if (id < 0) {
        return <div>Select a feature</div>;
    }
    return (
        <Query<Feature> query={GET_FEATURE} variables={{ id }}>
            {({ loading, error, data }) => {
                if (error) return `Error! ${error.message}`;
                if (loading || !data) return "Loading...";

                if (!data.feature) return "Repository not found";

                const {
                    feature: { name, branches }
                } = data;

                return (
                    <>
                        <Header as="h1">{name}</Header>
                        <Header as="h2">Branches</Header>
                        <CheckoutBranches
                            branches={branches.map(({ repository, name }) => ({
                                id: repository.id,
                                branch: name
                            }))}
                        >
                            {({ trigger, status }) => (
                                <>
                                    {trigger}
                                    {status}
                                </>
                            )}
                        </CheckoutBranches>
                        <List divided>
                            {branches.map(
                                ({
                                    name: branchName,
                                    repository: {
                                        name: repoName,
                                        currentBranch
                                    }
                                }) => (
                                    <List.Item key={branchName}>
                                        {branchName === currentBranch ? (
                                            <List.Icon
                                                size="large"
                                                color="green"
                                                name="check circle"
                                            />
                                        ) : (
                                            <List.Icon
                                                size="large"
                                                color="red"
                                                name="exclamation circle"
                                            />
                                        )}
                                        <List.Content>
                                            <List.Header>
                                                {repoName}
                                            </List.Header>
                                            <List.Description>
                                                Desired: {branchName}
                                            </List.Description>
                                            <List.Description>
                                                Current: {currentBranch}
                                            </List.Description>
                                        </List.Content>
                                    </List.Item>
                                )
                            )}
                        </List>
                    </>
                );
            }}
        </Query>
    );
};
