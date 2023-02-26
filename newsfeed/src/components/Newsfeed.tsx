import * as React from "react";
import {
  useLazyLoadQuery
} from "react-relay";
import { graphql } from "relay-runtime";
import NewsfeedContents from "./NewsfeedContents";
import type { NewsfeedQuery as NewsfeedQueryType } from "./__generated__/NewsfeedQuery.graphql";

const NewsfeedQuery = graphql`
  query NewsfeedQuery {
    ...NewsfeedContentsFragment
  }
`;

export default function Newsfeed() {
  const queryData = useLazyLoadQuery<NewsfeedQueryType>(NewsfeedQuery, {});

  return (
    <div className="newsfeed">
      <NewsfeedContents queryData={queryData} />
    </div>
  );
}
