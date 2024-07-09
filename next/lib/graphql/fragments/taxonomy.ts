import { graphql } from "@/lib/gql";

export const FRAGMENT_TAG = graphql(`
  fragment FragmentTag on TermTag {
    id
    name
  }
`);
