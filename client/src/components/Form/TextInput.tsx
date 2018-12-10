import React from "react";
import { Form, Icon, Input, Label } from "semantic-ui-react";
import { InjectedFieldProps } from "form-and-function";

export interface TextInputProps {
    label: string;
}

export const TextInput: React.SFC<InjectedFieldProps<TextInputProps>> = ({
    input,
    meta: { active, valid, touched, error },
    ownProps: { label }
}) => (
    <Form.Field>
        {error && touched && !active && (
            <Label basic color="red" pointing="below">
                {error}
            </Label>
        )}

        <Input
            {...input}
            focus={active}
            error={!valid}
            icon={
                touched &&
                (valid ? (
                    <Icon name="checkmark" />
                ) : (
                    <Icon name="warning circle" />
                ))
            }
            type="text"
            label={label}
        />
    </Form.Field>
);
