import React from "react";
import { View } from "./component";
import { RepoView } from "../RepoView";
import { FeatureView } from "../FeatureView";
import { TabHeader } from "./TabHeader";
import { Tab } from "semantic-ui-react";

export const panes = (views: View[], removeView: (index: number) => void) =>
    views.map(({ type, prop, title }, i) => {
        const contents =
            type === "repo" ? (
                <RepoView id={prop as number} />
            ) : (
                <FeatureView id={prop as number} />
            );
        return {
            menuItem: (
                <TabHeader key={i} title={title} close={() => removeView(i)} />
            ),
            render: () => <Tab.Pane key={i}>{contents}</Tab.Pane>,
            key: i
        };
    });
