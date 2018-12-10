import React from "react";
import { Query } from "react-apollo";
import { List } from "semantic-ui-react";

interface FeatureProps {
    onSelected: () => void;
    name: string;
}

export const FeatureListItem: React.SFC<FeatureProps> = ({
    name,
    onSelected
}) => (
    <List.Item onClick={onSelected}>
        <List.Icon name="tasks" size="large" verticalAlign="middle" />
        <List.Content>
            <List.Header as="span">{name}</List.Header>
        </List.Content>
    </List.Item>
);
