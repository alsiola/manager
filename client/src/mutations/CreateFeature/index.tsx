import React from "react";
import gql from "graphql-tag";
import { Mutation, MutationFn, MutationOptions } from "react-apollo";
import { Message, Icon, MessageProps } from "semantic-ui-react";
import {
    CreateFeatureVariables,
    CreateFeature as CreateFeatureResponse
} from "./__generated__/CreateFeature";

const CREATE_FEATURE = gql`
    mutation CreateFeature(
        $name: String!
        $issueCode: String!
        $featureBranches: [FeatureBranchInput!]!
    ) {
        createFeature(
            name: $name
            issueCode: $issueCode
            featureBranches: $featureBranches
        ) {
            success
            message
        }
    }
`;

export interface CreateFeatureInjectedProps {
    status: React.ReactElement<MessageProps>;
    createFeature: MutationFn<CreateFeatureResponse, CreateFeatureVariables>;
}

export interface CreateFeatureProps {
    children: (props: CreateFeatureInjectedProps) => React.ReactElement<any>;
}

export const CreateFeature: React.SFC<
    CreateFeatureProps &
        Partial<MutationOptions<CreateFeatureResponse, CreateFeatureVariables>>
> = ({ children, ...mutationProps }) => {
    return (
        <Mutation<CreateFeatureResponse, CreateFeatureVariables>
            {...mutationProps}
            mutation={CREATE_FEATURE}
        >
            {(createFeature, { data, error, loading, called }) => {
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
                        {called &&
                            (error ||
                                (data && !data.createFeature.success)) && (
                                <Message negative icon>
                                    <Icon name="first aid" />
                                    <Message.Content>
                                        <Message.Header>
                                            We hit a problem
                                        </Message.Header>
                                        {error && error.message}
                                        {data &&
                                            !data.createFeature.success &&
                                            data.createFeature.message}
                                    </Message.Content>
                                </Message>
                            )}
                    </>
                );
                return children({ createFeature, status });
            }}
        </Mutation>
    );
};
