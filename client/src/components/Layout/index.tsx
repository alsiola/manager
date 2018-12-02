import React from "react";
import { Grid, Container } from "semantic-ui-react";
import { RepoList } from "../RepoList";
import { withState } from "recompose";
import { RepoView } from "../RepoView";
import { FeatureList } from "../FeatureList";

export const Layout = withState("currentRepo", "setRepo", "")(
    ({ currentRepo, setRepo }) => (
        <Grid padded>
            <Grid.Column width={4}>
                <Container>
                    <RepoList setRepo={setRepo} />
                </Container>
            </Grid.Column>
            <Grid.Column width={8}>
                <RepoView name={currentRepo} />
            </Grid.Column>
            <Grid.Column width={4}>
                <Container>
                    <FeatureList />
                </Container>
            </Grid.Column>
        </Grid>
    )
);
