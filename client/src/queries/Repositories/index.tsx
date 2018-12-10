import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import {
    Repositories as RepositoriesResponse,
    Repositories_repositories
} from "./__generated__/Repositories";

const GET_REPOS = gql`
    query Repositories {
        repositories {
            id
            name
            branches
        }
    }
`;

export interface RepositoriesInjectedProps {
    (props: { repositories: Repositories_repositories[] }): React.ReactElement<
        any
    >;
}

export interface RepositoriesProps {
    children?: RepositoriesInjectedProps;
}

export const Repositories: React.SFC<RepositoriesProps> = ({ children }) => (
    <Query<RepositoriesResponse> query={GET_REPOS}>
        {({ loading, error, data }) => {
            if (error) {
                return `Error! ${error.message}`;
            }
            if (loading || !data) {
                return "Loading...";
            }

            return (
                children &&
                children({
                    repositories: data.repositories
                })
            );
        }}
    </Query>
);
