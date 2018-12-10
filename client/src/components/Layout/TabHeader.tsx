import React from "react";
import { MenuItemProps, Menu, Icon } from "semantic-ui-react";

export const TabHeader: React.SFC<
    {
        title: string;
        close: () => void;
    } & MenuItemProps
> = ({ title, close, active, onClick, index }) => {
    return (
        <Menu.Item
            onClick={e => onClick && onClick(e, { index })}
            active={active}
        >
            {title}
            <span style={{ paddingLeft: "5px" }}>
                <Icon name="window close outline" onClick={close} />
            </span>
        </Menu.Item>
    );
};
