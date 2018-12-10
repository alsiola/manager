/* tslint:disable */
// This file was automatically generated and should not be edited.

import { CheckoutBranchesInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: CheckoutBranch
// ====================================================

export interface CheckoutBranch_checkoutBranches_repositories_commits {
  __typename: "Commit";
  author: string;
  sha: string;
  message: string;
}

export interface CheckoutBranch_checkoutBranches_repositories_latestRelease {
  __typename: "Release";
  version: string;
  isMerged: boolean;
}

export interface CheckoutBranch_checkoutBranches_repositories {
  __typename: "Repository";
  name: string;
  currentBranch: string;
  branches: string[];
  commits: CheckoutBranch_checkoutBranches_repositories_commits[];
  latestRelease: CheckoutBranch_checkoutBranches_repositories_latestRelease | null;
}

export interface CheckoutBranch_checkoutBranches {
  __typename: "CheckoutBranchesResponse";
  success: boolean;
  message: string | null;
  repositories: CheckoutBranch_checkoutBranches_repositories[];
}

export interface CheckoutBranch {
  checkoutBranches: CheckoutBranch_checkoutBranches;
}

export interface CheckoutBranchVariables {
  branches: CheckoutBranchesInput[];
}
