/* tslint:disable */
// This file was automatically generated and should not be edited.

import { CheckoutBranchesInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: CheckoutBranches
// ====================================================

export interface CheckoutBranches_checkoutBranches_repositories_commits {
  __typename: "Commit";
  author: string;
  sha: string;
  message: string;
}

export interface CheckoutBranches_checkoutBranches_repositories_latestRelease {
  __typename: "Release";
  version: string;
  isMerged: boolean;
}

export interface CheckoutBranches_checkoutBranches_repositories {
  __typename: "Repository";
  id: number;
  name: string;
  currentBranch: string;
  branches: string[];
  commits: CheckoutBranches_checkoutBranches_repositories_commits[];
  latestRelease: CheckoutBranches_checkoutBranches_repositories_latestRelease | null;
}

export interface CheckoutBranches_checkoutBranches {
  __typename: "CheckoutBranchesResponse";
  success: boolean;
  message: string | null;
  repositories: CheckoutBranches_checkoutBranches_repositories[] | null;
}

export interface CheckoutBranches {
  checkoutBranches: CheckoutBranches_checkoutBranches;
}

export interface CheckoutBranchesVariables {
  branches: CheckoutBranchesInput[];
}
