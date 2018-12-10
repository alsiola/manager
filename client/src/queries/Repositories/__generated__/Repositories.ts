/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Repositories
// ====================================================

export interface Repositories_repositories {
  __typename: "Repository";
  id: number;
  name: string;
  branches: string[];
}

export interface Repositories {
  repositories: Repositories_repositories[];
}
