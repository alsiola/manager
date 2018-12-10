import React from "react";
import {
    Form,
    Icon,
    Input,
    Label,
    Select,
    DropdownItemProps
} from "semantic-ui-react";
import { InjectedFieldProps } from "form-and-function";

export interface DropdownInputProps {
    label: string;
    options: DropdownItemProps[];
}

export const DropdownInput: React.SFC<
    InjectedFieldProps<DropdownInputProps>
> = ({
    input,
    meta: { active, touched, error },
    ownProps: { label, options }
}) => (
    <>
        {error && touched && !active && (
            <Label basic color="red" pointing="below">
                {error}
            </Label>
        )}
        <Form.Field
            control={Select}
            options={options}
            label={{ children: label, htmlFor: `form-select-control-${label}` }}
            placeholder={label}
            search
            searchInput={{ id: "form-select-control-gender" }}
            {...input}
        />
    </>
);
