import React from "react";
import gql from "graphql-tag";
import { Mutation, MutationFn, MutationOptions } from "react-apollo";
import {
    Button,
    Message,
    Icon,
    ButtonProps,
    MessageProps
} from "semantic-ui-react";
import {
    CheckoutBranchVariables,
    CheckoutBranch as CheckoutBranchResponse
} from "./__generated__/CheckoutBranch";

const CHECKOUT_BRANCH = gql`
    mutation CheckoutBranch($id: Int!, $branch: String!) {
        checkoutBranch(id: $id, branch: $branch) {
            success
            message
            repository {
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
    trigger: React.ReactElement<ButtonProps>;
    status: React.ReactElement<MessageProps>;
    checkoutBranch: MutationFn<CheckoutBranchResponse, CheckoutBranchVariables>;
}

export interface FetchProps {
    text?: string;
    children?: (props: CheckoutBranchInjectedProps) => React.ReactElement<any>;
}

enum State {
    NotRunYet = "NotRunYet",
    Error = "Error",
    Loading = "Loading",
    Success = "Success"
}

type CheckoutBranchAllProps = Partial<CheckoutBranchVariables> &
    FetchProps &
    Partial<MutationOptions<CheckoutBranchResponse, CheckoutBranchVariables>>;

export const CheckoutBranch = ({
    id,
    branch,
    text,
    children,
    ...mutationOpts
}: CheckoutBranchAllProps): React.ReactElement<CheckoutBranchAllProps> => {
    return (
        <Mutation<CheckoutBranchResponse, CheckoutBranchVariables>
            {...mutationOpts}
            mutation={CHECKOUT_BRANCH}
        >
            {(checkoutBranch, { data, error, loading, called }) => {
                const state =
                    loading && called
                        ? State.Loading
                        : called &&
                          (error || (data && !data.checkoutBranch.success))
                        ? State.Error
                        : called &&
                          (!error && (data && data.checkoutBranch.success))
                        ? State.Success
                        : State.NotRunYet;
                const trigger = (
                    <Button
                        onClick={() => {
                            if (!id || !branch) {
                                console.warn("Missing variables: id, branch");
                                return;
                            }
                            checkoutBranch({
                                variables: {
                                    id,
                                    branch
                                }
                            });
                        }}
                        animated="fade"
                        compact
                    >
                        {text || "Fetch"}
                    </Button>
                );
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
                                        !data.checkoutBranch.success &&
                                        data.checkoutBranch.message}
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
                        {state === State.NotRunYet && (
                            <Message positive icon>
                                <Icon name="first aid" />
                                <Message.Content>
                                    <Message.Header>
                                        Ready to go!
                                    </Message.Header>
                                    I'll let you know how we get on
                                </Message.Content>
                            </Message>
                        )}
                    </>
                );
                return (
                    children && children({ trigger, status, checkoutBranch })
                );
            }}
        </Mutation>
    );
};
