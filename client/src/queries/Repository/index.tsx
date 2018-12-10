import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import {
    Repository as RepositoryResponse,
    Repository_repository,
    RepositoryVariables
} from "./__generated__/Repository";

const GET_REPO = gql`
    query Repository($id: Int!) {
        repository(id: $id) {
            id
            name
            currentBranch
            branches
        }
    }
`;

export interface RepositoriesInjectedProps {
    (props: { repository: Repository_repository }): React.ReactElement<any>;
}

export interface RepositoriesProps {
    children?: RepositoriesInjectedProps;
}

export const Repository: React.SFC<RepositoriesProps & RepositoryVariables> = ({
    children,
    id
}) => (
    <Query<RepositoryResponse> query={GET_REPO} variables={{ id }}>
        {({ loading, error, data }) => {
            if (error) {
                return `Error! ${error.message}`;
            }

            if (loading || !data) {
                return "Loading...";
            }

            if (!loading && data && !data.repository) {
                return "Repository not found";
            }

            return (
                children &&
                children({
                    repository: data.repository!
                })
            );
        }}
    </Query>
);
