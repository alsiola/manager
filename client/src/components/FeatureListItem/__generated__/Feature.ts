/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Feature
// ====================================================

export interface Feature_feature_branches_repository {
  __typename: "Repository";
  name: string;
}

export interface Feature_feature_branches {
  __typename: "FeatureBranch";
  id: number;
  name: string;
  repository: Feature_feature_branches_repository;
}

export interface Feature_feature {
  __typename: "Feature";
  id: number;
  name: string;
  branches: Feature_feature_branches[];
}

export interface Feature {
  feature: Feature_feature | null;
}

export interface FeatureVariables {
  id: number;
}
