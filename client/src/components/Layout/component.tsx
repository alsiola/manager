import React from "react";
import { Grid, Container, Tab, Sticky } from "semantic-ui-react";
import { RepoList } from "../RepoList";
import { FeatureList } from "../FeatureList";
import { panes } from "./panes";

enum ViewType {
    feature = "feature",
    repo = "repo"
}

interface FeatureViewDef {
    type: ViewType.feature;
    title: string;
    prop: number;
}

interface RepoViewDef {
    type: ViewType.repo;
    title: string;
    prop: number;
}

export type View = FeatureViewDef | RepoViewDef;

export interface LayoutState {
    views: View[];
    currentView: number;
}

export interface LayoutProps extends Record<string, any> {
    addView: (view: View) => any;
    setCurrentView: (index: number) => any;
    removeView: (index: number) => any;
}

export const LayoutComponent: React.SFC<LayoutProps & LayoutState> = ({
    currentView,
    setCurrentView,
    views,
    addView,
    removeView,
    children
}) => {
    return (
        <>
            <Grid padded>
                <Grid.Column width={4}>
                    <Container>
                        <RepoList
                            setRepo={({ id, name }) =>
                                addView({
                                    type: ViewType.repo,
                                    prop: id,
                                    title: name
                                })
                            }
                        />
                    </Container>
                </Grid.Column>
                <Grid.Column width={8}>
                    <Tab
                        activeIndex={currentView}
                        panes={panes(views, removeView)}
                        onTabChange={(_, { activeIndex }) => {
                            setCurrentView(activeIndex as number);
                        }}
                    />
                </Grid.Column>
                <Grid.Column width={4}>
                    <Container>
                        <FeatureList
                            setFeature={({ id, title }) =>
                                addView({
                                    type: ViewType.feature,
                                    prop: id,
                                    title
                                })
                            }
                        />
                    </Container>
                </Grid.Column>
            </Grid>
            {children}
        </>
    );
};
