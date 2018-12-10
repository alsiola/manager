import React, { Component } from "react";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from "react-apollo";
import { Layout } from "./components/Layout";
import { Router } from "@reach/router";
import { FeatureCreate } from "./components/FeatureCreate";
import { ConnectJIRA } from "./components/ConnectJIRA";

const client = new ApolloClient({
    link: new HttpLink({
        uri: "http://localhost:4000/graphql"
    }),
    cache: new InMemoryCache()
});

class App extends Component {
    render() {
        return (
            <ApolloProvider client={client}>
                <Router>
                    <Layout path="/">
                        <FeatureCreate path="feature/create" />
                        <ConnectJIRA path="connect/jira" />
                    </Layout>
                </Router>
            </ApolloProvider>
        );
    }
}

export default App;
