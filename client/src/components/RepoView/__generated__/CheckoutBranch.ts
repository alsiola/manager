/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CheckoutBranch
// ====================================================

export interface CheckoutBranch_checkoutBranch_repository_commits {
  __typename: "Commit";
  author: string;
  sha: string;
  message: string;
}

export interface CheckoutBranch_checkoutBranch_repository_latestRelease {
  __typename: "Release";
  version: string;
  isMerged: boolean;
}

export interface CheckoutBranch_checkoutBranch_repository {
  __typename: "Repository";
  name: string;
  currentBranch: string;
  branches: string[];
  commits: CheckoutBranch_checkoutBranch_repository_commits[];
  latestRelease: CheckoutBranch_checkoutBranch_repository_latestRelease | null;
}

export interface CheckoutBranch_checkoutBranch {
  __typename: "CheckoutBranchResponse";
  success: boolean;
  message: string | null;
  repository: CheckoutBranch_checkoutBranch_repository | null;
}

export interface CheckoutBranch {
  checkoutBranch: CheckoutBranch_checkoutBranch;
}

export interface CheckoutBranchVariables {
  repo: string;
  branch: string;
}
