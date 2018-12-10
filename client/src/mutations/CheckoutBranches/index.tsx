import React from "react";
import gql from "graphql-tag";
import { Mutation, MutationFn, MutationOptions } from "react-apollo";
import { Message, Icon, MessageProps, Button } from "semantic-ui-react";
import {
    CheckoutBranchesVariables,
    CheckoutBranches as CheckoutBranchesResponse
} from "./__generated__/CheckoutBranches";
import { CheckoutBranchesInput } from "../../../__generated__/globalTypes";

const CHECKOUT_BRANCHES = gql`
    mutation CheckoutBranches($branches: [CheckoutBranchesInput!]!) {
        checkoutBranches(branches: $branches) {
            success
            message
            repositories {
                id
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
    }
`;

export interface CheckoutBranchInjectedProps {
    status: React.ReactElement<MessageProps>;
    checkoutBranches: MutationFn<
        CheckoutBranchesResponse,
        CheckoutBranchesVariables
    >;
    trigger: React.ReactElement<any>;
}

export interface FetchProps {
    text?: string;
    branches: CheckoutBranchesInput[];
    children?: (props: CheckoutBranchInjectedProps) => React.ReactElement<any>;
}

enum State {
    NotRunYet = "NotRunYet",
    Error = "Error",
    Loading = "Loading",
    Success = "Success"
}

type CheckoutBranchesAllProps = Partial<CheckoutBranchesVariables> &
    FetchProps &
    Partial<
        MutationOptions<CheckoutBranchesResponse, CheckoutBranchesVariables>
    >;

export const CheckoutBranches: React.SFC<CheckoutBranchesAllProps> = ({
    text,
    branches,
    children,
    ...mutationOpts
}) => {
    return (
        <Mutation<CheckoutBranchesResponse, CheckoutBranchesVariables>
            {...mutationOpts}
            mutation={CHECKOUT_BRANCHES}
        >
            {(checkoutBranches, { data, error, loading, called }) => {
                const state =
                    loading && called
                        ? State.Loading
                        : called &&
                          (error || (data && !data.checkoutBranches.success))
                        ? State.Error
                        : called &&
                          (!error && (data && data.checkoutBranches.success))
                        ? State.Success
                        : State.NotRunYet;
                const status = (
                    <>
                        {state === State.Loading && (
                            <Message warning icon>
                                <Icon name="circle notched" loading />
                                <Message.Content>
                                    <Message.Header>
                                        Just one second
                                    </Message.Header>
                                    We're performing that operation
                                </Message.Content>
                            </Message>
                        )}
                        {state === State.Error && (
                            <Message negative icon>
                                <Icon name="first aid" />
                                <Message.Content>
                                    <Message.Header>
                                        We hit a problem
                                    </Message.Header>
                                    {error && error.message}
                                    {data &&
                                        !data.checkoutBranches.success &&
                                        data.checkoutBranches.message}
                                </Message.Content>
                            </Message>
                        )}
                        {state === State.Success && (
                            <Message positive icon>
                                <Icon name="first aid" />
                                <Message.Content>
                                    <Message.Header>All sorted</Message.Header>
                                    Consider yourself... checked out.
                                </Message.Content>
                            </Message>
                        )}
                    </>
                );
                const trigger = (
                    <Button
                        onClick={() => {
                            if (!branches) {
                                console.warn(
                                    "Missing variables: repo, branches"
                                );
                                return;
                            }
                            checkoutBranches({
                                variables: {
                                    branches
                                }
                            });
                        }}
                    >
                        {text || "Checkout Branches"}
                    </Button>
                );
                return (
                    children && children({ status, checkoutBranches, trigger })
                );
            }}
        </Mutation>
    );
};
