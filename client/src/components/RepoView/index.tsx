import React from "react";
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import {
    Repository as RepositoryResponse,
    RepositoryVariables
} from "./__generated__/Repository";
import {
    CheckoutBranch,
    CheckoutBranchVariables
} from "./__generated__/CheckoutBranch";
import { Dropdown, Header, List, Button } from "semantic-ui-react";

const GET_REPO = gql`
    query Repository($name: String!) {
        repository(name: $name) {
            name
            currentBranch
            branches
            commits(count: 10) {
                author
                sha
                message
            }
            latestRelease {
                version
                isMerged
            }
        }
    }
`;

const CHECKOUT_BRANCH = gql`
    mutation CheckoutBranch($repo: String!, $branch: String!) {
        checkoutBranch(repo: $repo, branch: $branch) {
            name
            currentBranch
            branches
            commits(count: 10) {
                author
                sha
                message
            }
            latestRelease {
                version
                isMerged
            }
        }
    }
`;

export const RepoView: React.SFC<RepositoryVariables> = ({ name }) => {
    if (!name) {
        return <div>Select a repository</div>;
    }
    return (
        <Query<RepositoryResponse, RepositoryVariables>
            query={GET_REPO}
            variables={{ name }}
        >
            {({ loading, error, data }) => {
                if (error) return `Error! ${error.message}`;
                if (loading || !data) return "Loading...";

                if (!data.repository) return "Repository not found";

                const {
                    repository: {
                        name,
                        currentBranch,
                        branches,
                        commits,
                        latestRelease
                    }
                } = data;

                return (
                    <Mutation<CheckoutBranch, CheckoutBranchVariables>
                        mutation={CHECKOUT_BRANCH}
                    >
                        {checkoutBranch => (
                            <>
                                <Header as="h1">{name}</Header>
                                {latestRelease && (
                                    <>
                                        <Header as="h2">
                                            Latest Release:{" "}
                                            {latestRelease.version}
                                        </Header>
                                        <p>
                                            {latestRelease.isMerged
                                                ? "This release is fully merged"
                                                : "This release is open"}
                                        </p>
                                        <Button
                                            onClick={() =>
                                                checkoutBranch({
                                                    variables: {
                                                        repo: name,
                                                        branch: `release/${
                                                            latestRelease.version
                                                        }`
                                                    }
                                                })
                                            }
                                        >
                                            Checkout release/
                                            {latestRelease.version}
                                        </Button>
                                        <Button
                                            onClick={() =>
                                                checkoutBranch({
                                                    variables: {
                                                        repo: name,
                                                        branch: "master"
                                                    }
                                                })
                                            }
                                        >
                                            Checkout master
                                        </Button>
                                        <Button
                                            onClick={() =>
                                                checkoutBranch({
                                                    variables: {
                                                        repo: name,
                                                        branch: "develop"
                                                    }
                                                })
                                            }
                                        >
                                            Checkout develop
                                        </Button>
                                    </>
                                )}
                                <Header as="h2">Checkout Branch</Header>
                                <Dropdown
                                    fluid
                                    selection
                                    value={currentBranch}
                                    options={branches.map(branch => ({
                                        text: branch,
                                        value: branch
                                    }))}
                                    onChange={(_, { value }) =>
                                        checkoutBranch({
                                            variables: {
                                                branch: value as string,
                                                repo: name
                                            }
                                        })
                                    }
                                />
                                <Header as="h2">Log</Header>
                                <List divided>
                                    {commits.map(({ author, message }) => (
                                        <List.Item>
                                            <List.Content>
                                                <List.Header>
                                                    {author}
                                                </List.Header>
                                                {message
                                                    .split("\n")
                                                    .map(msg => (
                                                        <List.Description>
                                                            {msg}
                                                        </List.Description>
                                                    ))}
                                            </List.Content>
                                        </List.Item>
                                    ))}
                                </List>
                            </>
                        )}
                    </Mutation>
                );
            }}
        </Query>
    );
};
