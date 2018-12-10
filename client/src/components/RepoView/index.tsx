import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import {
    Repository as RepositoryResponse,
    RepositoryVariables
} from "./__generated__/Repository";
import { Dropdown, Header, Label, Icon, Divider } from "semantic-ui-react";
import { Fetch } from "../../mutations/Fetch";
import { CheckoutBranch } from "../../mutations/CheckoutBranch";
import { Log } from "../Log";
import { RunButton } from "../RunButton";

const GET_REPO = gql`
    query Repository($id: Int!) {
        repository(id: $id) {
            id
            name
            currentBranch
            branches
            commits(count: 30) {
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

export const RepoView: React.SFC<RepositoryVariables> = ({ id }) => {
    if (!id) {
        return <div>Select a repository</div>;
    }

    console.log({ id });
    return (
        <Query<RepositoryResponse, RepositoryVariables>
            query={GET_REPO}
            variables={{ id }}
        >
            {({ loading, error, data }) => {
                if (error) {
                    return `Error! ${error.message}`;
                }
                if (loading || !data) {
                    return (
                        <Icon size="massive" name="circle notched" loading />
                    );
                }

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
                    <>
                        <Label as="div" ribbon color="orange">
                            Current
                            <Label.Detail>{currentBranch}</Label.Detail>
                        </Label>
                        {latestRelease && (
                            <>
                                <Label as="div" color="orange">
                                    Release (
                                    {latestRelease.isMerged ? "merged" : "open"}
                                    )
                                    <Label.Detail>
                                        {latestRelease.version}
                                    </Label.Detail>
                                </Label>
                            </>
                        )}
                        <Divider />
                        <CheckoutBranch
                            refetchQueries={[
                                { query: GET_REPO, variables: { name } }
                            ]}
                        >
                            {({ checkoutBranch, status }) => (
                                <>
                                    {status}
                                    {latestRelease && (
                                        <RunButton
                                            clickFn={checkoutBranch}
                                            args={{
                                                variables: {
                                                    id,
                                                    branch:
                                                        latestRelease.version
                                                }
                                            }}
                                            text={latestRelease.version}
                                            icon="code branch"
                                        />
                                    )}
                                    <RunButton
                                        clickFn={checkoutBranch}
                                        args={{
                                            variables: {
                                                id,
                                                branch: "master"
                                            }
                                        }}
                                        text="master"
                                        icon="code branch"
                                    />
                                    <RunButton
                                        clickFn={checkoutBranch}
                                        args={{
                                            variables: {
                                                id,
                                                branch: "develop"
                                            }
                                        }}
                                        text="develop"
                                        icon="code branch"
                                    />

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
                                                    id
                                                }
                                            })
                                        }
                                    />
                                </>
                            )}
                        </CheckoutBranch>

                        <Fetch id={id}>
                            {({ trigger, status }) => (
                                <>
                                    {trigger}
                                    {status}
                                </>
                            )}
                        </Fetch>

                        <Log commits={commits} />
                    </>
                );
            }}
        </Query>
    );
};
