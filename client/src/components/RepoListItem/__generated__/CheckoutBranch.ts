/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CheckoutBranch
// ====================================================

export interface CheckoutBranch_checkoutBranch {
  __typename: "Repository";
  name: string;
  currentBranch: string;
  branches: string[];
}

export interface CheckoutBranch {
  checkoutBranch: CheckoutBranch_checkoutBranch | null;
}

export interface CheckoutBranchVariables {
  repo: string;
  branch: string;
}
