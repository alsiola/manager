/* tslint:disable */
// This file was automatically generated and should not be edited.

import { FeatureBranchInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: CreateFeature
// ====================================================

export interface CreateFeature_createFeature {
  __typename: "MutationResult";
  success: boolean;
  message: string | null;
}

export interface CreateFeature {
  createFeature: CreateFeature_createFeature;
}

export interface CreateFeatureVariables {
  name: string;
  issueCode: string;
  featureBranches: FeatureBranchInput[];
}
