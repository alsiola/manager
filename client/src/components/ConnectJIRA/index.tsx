import React from "react";
import { Modal } from "semantic-ui-react";
import { RouteComponentProps } from "@reach/router";

export const ConnectJIRA: React.SFC<RouteComponentProps> = ({ navigate }) => {
    return (
        <Modal
            size="large"
            open={true}
            onClose={() => navigate && navigate("/")}
        >
            <Modal.Header>Connect to JIRA</Modal.Header>
            <Modal.Content>
                <iframe
                    style={{
                        width: "100%",
                        height: "100%",
                        minHeight: "600px"
                    }}
                    src="http://localhost:4000/connect/jira"
                />
            </Modal.Content>
        </Modal>
    );
};
