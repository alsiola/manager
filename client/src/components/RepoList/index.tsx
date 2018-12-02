import gql from "graphql-tag";
import { Query } from "react-apollo";
import React from "react";
import { Repositories } from "./__generated__/Repositories";
import { RepoListItem } from "../RepoListItem";
import { Item, Header } from "semantic-ui-react";

const GET_REPOS = gql`
    query Repositories {
        repositories {
            name
        }
    }
`;

interface RepoListProps {
    setRepo: (name: string) => void;
}

export const RepoList: React.SFC<RepoListProps> = ({ setRepo }) => (
    <>
        <Header>Repositories</Header>
        <Query<Repositories> query={GET_REPOS}>
            {({ loading, error, data }) => {
                if (error) return `Error! ${error.message}`;
                if (loading || !data) return "Loading...";

                return (
                    <Item.Group divided>
                        {data.repositories.map(({ name }) => (
                            <RepoListItem
                                key={name}
                                name={name}
                                onSelected={() => setRepo(name)}
                            />
                        ))}
                    </Item.Group>
                );
            }}
        </Query>
    </>
);
