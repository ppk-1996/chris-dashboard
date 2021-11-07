import { useState } from "react";
import { useQuery } from "react-query";

import useAuth from "../hooks/useAuth";

const Library = (): JSX.Element => {
  const { client } = useAuth();
  const [page, setPage] = useState(0);

  const fetchProjects = (offset = 0) => client.getFeeds({ offset });

  const { isLoading, isError, error, data, isFetching, isPreviousData } =
    useQuery(["projects", page], () => fetchProjects(page), {
      keepPreviousData: true,
    });
  return (
    <div>
      <h1>Library</h1>
      <p>{JSON.stringify(data, null, 2)}</p>
      <button
        type="button"
        onClick={() => setPage((old) => Math.max(old - 1, 0))}
        disabled={page === 0}
      >
        Previous Page
      </button>
      <button
        type="button"
        onClick={() => {
          if (!isPreviousData) {
            setPage((old) => old + 1);
          }
        }}
      >
        Next Page
      </button>
    </div>
  );
};

export default Library;
