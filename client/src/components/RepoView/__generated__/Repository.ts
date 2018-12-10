/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Repository
// ====================================================

export interface Repository_repository_commits {
  __typename: "Commit";
  author: string;
  sha: string;
  message: string;
}

export interface Repository_repository_latestRelease {
  __typename: "Release";
  version: string;
  isMerged: boolean;
}

export interface Repository_repository {
  __typename: "Repository";
  id: number;
  name: string;
  currentBranch: string;
  branches: string[];
  commits: Repository_repository_commits[];
  latestRelease: Repository_repository_latestRelease | null;
}

export interface Repository {
  repository: Repository_repository | null;
}

export interface RepositoryVariables {
  id: number;
}
