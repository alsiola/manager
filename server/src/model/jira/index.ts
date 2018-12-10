import JiraClient from "jira-client";

const client = () =>
    new JiraClient({
        host: process.env.JIRA_HOST as string,
        username: process.env.JIRA_USER as string,
        password: process.env.JIRA_PASS as string,
        apiVersion: "2",
        strictSSL: true
    });

export interface IssueComment {
    author: {
        displayName: string;
    };
    body: string;
    created: string;
}

export interface Issue {
    fields: {
        description: string;
        status: {
            name: string;
        };
        comment: { comments: IssueComment[] };
    };
}

export const getIssue = ({ issueCode }: { issueCode: string }) => {
    return (client().findIssue(issueCode) as any).then((issue: Issue) => ({
        issueCode,
        status: issue.fields.status.name,
        description: issue.fields.description,
        comment: issue.fields.comment.comments.map(
            ({ author: { displayName }, body, created }) => ({
                author: displayName,
                body,
                created
            })
        )
    }));
};
