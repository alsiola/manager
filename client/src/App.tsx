import React, { Component } from "react";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache, defaultDataIdFromObject } from "apollo-cache-inmemory";
import { ApolloProvider } from "react-apollo";
import { RepoList } from "./components/RepoList";
import { Layout } from "./components/Layout";

const client = new ApolloClient({
    link: new HttpLink({
        uri: "http://localhost:4000/graphql"
    }),
    cache: new InMemoryCache({
        dataIdFromObject: (obj: any) => {
            switch (obj.__typename) {
                case "Repository":
                    return obj.name;
                default:
                    return defaultDataIdFromObject(obj);
            }
        }
    })
});

class App extends Component {
    render() {
        return (
            <ApolloProvider client={client}>
                <Layout />
            </ApolloProvider>
        );
    }
}

export default App;
