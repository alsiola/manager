/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: Fetch
// ====================================================

export interface Fetch_fetch {
  __typename: "MutationResult";
  success: boolean;
  message: string | null;
}

export interface Fetch {
  fetch: Fetch_fetch;
}

export interface FetchVariables {
  id: number;
}
