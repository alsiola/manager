/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CheckoutBranch
// ====================================================

export interface CheckoutBranch_checkoutBranch_commits {
  __typename: "Commit";
  author: string;
  sha: string;
  message: string;
}

export interface CheckoutBranch_checkoutBranch_latestRelease {
  __typename: "Release";
  version: string;
  isMerged: boolean;
}

export interface CheckoutBranch_checkoutBranch {
  __typename: "Repository";
  name: string;
  currentBranch: string;
  branches: string[];
  commits: CheckoutBranch_checkoutBranch_commits[];
  latestRelease: CheckoutBranch_checkoutBranch_latestRelease | null;
}

export interface CheckoutBranch {
  checkoutBranch: CheckoutBranch_checkoutBranch | null;
}

export interface CheckoutBranchVariables {
  repo: string;
  branch: string;
}
