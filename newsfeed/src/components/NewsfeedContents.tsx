import * as React from "react";
import { graphql } from "relay-runtime";
import { useFragment, usePaginationFragment } from "react-relay";
import { NewsfeedContentsFragment$key } from "./__generated__/NewsfeedContentsFragment.graphql";
import Story from "./Story";
import InfiniteScrollTrigger from "./InfiniteScrollTrigger";

const NewsfeedContentsFragment = graphql`
  fragment NewsfeedContentsFragment on Query
  @argumentDefinitions(
    cursor: { type: "String" }
    count: { type: "Int", defaultValue: 2 }
  )
  @refetchable(queryName: "NewsfeedContentsRefetchQuery") {
    viewer {
      newsfeedStories(after: $cursor, first: $count)
        @connection(key: "NewsfeedContentsFragment_newsfeedStories") {
        edges {
          node {
            id
            ...StoryFragment
          }
        }
      }
    }
  }
`;

type Props = {
  queryData: NewsfeedContentsFragment$key;
};

export default function NewsfeedContents({
  queryData,
}: Props): React.ReactElement {
  const { data, loadNext, hasNext, isLoadingNext } = usePaginationFragment(
    NewsfeedContentsFragment,
    queryData
  );
  function onEndReached() {
    loadNext(2);
  }

  const storyEdges = data.viewer.newsfeedStories.edges;

  return (
    <div className="newsfeed">
      {storyEdges.map((storyEdge) => (
        <Story key={storyEdge.node.id} story={storyEdge.node} />
      ))}
      <InfiniteScrollTrigger
        onEndReached={onEndReached}
        hasNext={hasNext}
        isLoadingNext={isLoadingNext}
      />
    </div>
  );
}
