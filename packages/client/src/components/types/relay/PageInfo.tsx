import React from "react";
import { PageInfo as PageInfoType, ConnectionArguments } from "graphql-relay";

interface PageInfoProps {
  data: PageInfoType;
  updateArguments?: (options: ConnectionArguments) => void;
}

const PageInfo: React.FC<PageInfoProps> = ({
  data,
  updateArguments = () => {}
}) => {
  return (
    <div className="inline-flex justify-center w-auto">
      <button
        className="paginate-control rounded-l"
        disabled={!data.hasPreviousPage}
        onClick={() =>
          updateArguments({ before: data.startCursor, after: undefined })
        }
      >
        Prev
      </button>
      <button
        className="paginate-control rounded-r"
        disabled={!data.hasNextPage}
        onClick={() =>
          updateArguments({ after: data.endCursor, before: undefined })
        }
      >
        Next
      </button>
    </div>
  );
};

export default PageInfo;
