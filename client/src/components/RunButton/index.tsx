import React from "react";
import { Button, Icon, SemanticICONS } from "semantic-ui-react";

export interface RunButtonProps<T> {
    clickFn: (a: T) => void;
    args: T;
    icon?: SemanticICONS;
    text: string;
}

export const RunButton = <T extends {}>({
    clickFn,
    args,
    icon,
    text
}: RunButtonProps<T>): React.ReactElement<any> => (
    <Button onClick={() => clickFn(args)} animated="fade" compact>
        <Button.Content visible>{text}</Button.Content>
        <Button.Content hidden>
            <Icon name={icon} />
        </Button.Content>
    </Button>
);
