/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Repository
// ====================================================

export interface Repository_repository {
  __typename: "Repository";
  name: string;
  currentBranch: string;
  branches: string[];
}

export interface Repository {
  repository: Repository_repository | null;
}

export interface RepositoryVariables {
  name: string;
}
