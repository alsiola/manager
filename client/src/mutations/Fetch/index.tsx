import React from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import {
    Button,
    Message,
    Icon,
    ButtonProps,
    MessageProps
} from "semantic-ui-react";
import { FetchVariables, Fetch as FetchResponse } from "./__generated__/Fetch";

const FETCH = gql`
    mutation Fetch($id: Int!) {
        fetch(id: $id) {
            success
            message
        }
    }
`;

export interface FetchInjectedProps {
    trigger: React.ReactElement<ButtonProps>;
    status: React.ReactElement<MessageProps>;
}

export interface FetchProps {
    children: (props: FetchInjectedProps) => React.ReactElement<any>;
}

export const Fetch: React.SFC<FetchVariables & FetchProps> = ({
    id,
    children
}) => {
    if (!id) {
        return null;
    }

    return (
        <Mutation<FetchResponse, FetchVariables> mutation={FETCH}>
            {(fetch, { data, error, loading, called }) => {
                const trigger = (
                    <Button
                        onClick={() =>
                            fetch({
                                variables: {
                                    id
                                }
                            })
                        }
                    >
                        Fetch
                    </Button>
                );

                const status = (
                    <>
                        {loading && called && (
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
                        {called && (error || (data && !data.fetch.success)) && (
                            <Message negative icon>
                                <Icon name="first aid" />
                                <Message.Content>
                                    <Message.Header>
                                        We hit a problem
                                    </Message.Header>
                                    {error && error.message}
                                    {data &&
                                        !data.fetch.success &&
                                        data.fetch.message}
                                </Message.Content>
                            </Message>
                        )}
                    </>
                );
                return children({ trigger, status });
            }}
        </Mutation>
    );
};
