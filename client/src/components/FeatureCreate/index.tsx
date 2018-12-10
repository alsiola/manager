import React from "react";
import { Modal, Button, Form as SURForm } from "semantic-ui-react";
import { Form, validation, FormEventHandler } from "form-and-function";
import { TextInput } from "../Form/TextInput";
import { RouteComponentProps } from "@reach/router";
import { Repositories } from "../../queries/Repositories";
import { DropdownInput } from "../Form/DropdownInput";
import {
    CreateFeature,
    CreateFeatureInjectedProps
} from "../../mutations/CreateFeature";
import { GET_FEATURES } from "../FeatureList";

const REPO_PREFIX = "repository-";

const handleSubmit = ({
    createFeature,
    navigate
}: Pick<CreateFeatureInjectedProps, "createFeature"> &
    Pick<
        RouteComponentProps,
        "navigate"
    >): FormEventHandler => async formData => {
    const { name, issueCode, ...featureBranches } = formData;
    await createFeature({
        variables: {
            name: formData.name.value as string,
            issueCode: formData.issueCode.value as string,
            featureBranches: Object.entries(featureBranches).map(
                ([repository, { value }]) => ({
                    repository: Number(repository.substr(REPO_PREFIX.length)),
                    name: value as string
                })
            )
        }
    }).then(() => navigate && navigate("/"));
};

export const FeatureCreate: React.SFC<RouteComponentProps> = ({ navigate }) => {
    return (
        <Modal open={true} onClose={() => navigate && navigate("/")}>
            <Modal.Header>Create A New Feature</Modal.Header>
            <Modal.Content>
                <Modal.Description>
                    <CreateFeature refetchQueries={[{ query: GET_FEATURES }]}>
                        {({ createFeature, status }) => (
                            <Repositories>
                                {({ repositories }) => (
                                    <Form<{}, any>
                                        validators={validation.create({
                                            name: validation.atLeast({
                                                chars: 3
                                            }),
                                            issueCode: validation.all(
                                                [
                                                    validation.matches({
                                                        regex: /[A-Z]+\-[0-9]+/
                                                    }),
                                                    validation.atLeast({
                                                        chars: 2
                                                    })
                                                ],
                                                () =>
                                                    "Must be a valid JIRA issue code"
                                            )
                                        })}
                                        name="add-feature"
                                        onSubmit={handleSubmit({
                                            createFeature,
                                            navigate
                                        })}
                                        initialValues={repositories.reduce(
                                            (out, { id }) => ({
                                                ...out,
                                                [REPO_PREFIX + id]: "master"
                                            }),
                                            {}
                                        )}
                                        render={({
                                            form,
                                            Field,
                                            meta: { isSubmitting, valid },
                                            actions: { submit }
                                        }) => (
                                            <SURForm {...form}>
                                                <Field
                                                    name="name"
                                                    render={TextInput}
                                                    renderProps={{
                                                        label: "Feature name"
                                                    }}
                                                />
                                                <Field
                                                    name="issueCode"
                                                    render={TextInput}
                                                    renderProps={{
                                                        label: "JIRA Issue Code"
                                                    }}
                                                />
                                                {repositories.map(
                                                    repository => (
                                                        <Field
                                                            key={
                                                                repository.name
                                                            }
                                                            name={
                                                                REPO_PREFIX +
                                                                repository.id
                                                            }
                                                            render={
                                                                DropdownInput
                                                            }
                                                            renderProps={{
                                                                label:
                                                                    repository.name,
                                                                options: repository.branches.map(
                                                                    name => ({
                                                                        text: name,
                                                                        value: name
                                                                    })
                                                                )
                                                            }}
                                                        />
                                                    )
                                                )}
                                                {status}
                                                <Button
                                                    disabled={
                                                        !valid || isSubmitting
                                                    }
                                                    onClick={submit}
                                                >
                                                    Create!
                                                </Button>
                                            </SURForm>
                                        )}
                                    />
                                )}
                            </Repositories>
                        )}
                    </CreateFeature>
                </Modal.Description>
            </Modal.Content>
        </Modal>
    );
};
