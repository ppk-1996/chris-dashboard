import { useState } from "react";
import { Link } from "react-router-dom";

import useAnalyses from "../hooks/useAnalyses";
import { getTotalPages } from "../utils/helpers";

const Analyses = (): JSX.Element => {
  const [offset, setOffset] = useState(0);
  const [name, setName] = useState();
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(0);
  const {
    data: analyses,
    isFetching,
    isLoading,
    isPreviousData,
  } = useAnalyses(offset, name, limit);

  const getNextPage = () => {
    if (!isPreviousData) {
      setPage((old) => old + 1);
      setOffset((old) => old + limit);
    }
  };
  const getPreviousPage = () => {
    setPage((old) => Math.max(old - 1, 0));
    setOffset((old) => Math.max(old - limit, 0));
  };
  const jumpToPage = (pageNumber: number) => {
    setPage(pageNumber);
    setOffset(pageNumber * limit);
  };
  const totalPage = getTotalPages(analyses?.total, limit);

  return (
    <div>
      <h1>Analyses</h1>
      <div>
        <label htmlFor="limit">
          Change Limit:{" "}
          <input
            defaultValue={limit}
            name="limit"
            type="number"
            onChange={(evt) => setLimit(parseInt(evt.target.value, 10))}
          />
        </label>
      </div>
      <div>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <ol>
            {analyses?.data.map((analysis) => (
              <li key={analysis.id}>
                <Link to={`analyses/${analysis.id}`}> {analysis.name}</Link>
              </li>
            ))}
          </ol>
        )}
      </div>
      <div>Total Analysis: {analyses?.total}</div>
      <div>Current Page : {page + 1}</div>
      <div>Total Pages: {totalPage}</div>
      <button type="button" onClick={getPreviousPage} disabled={offset === 0}>
        Previous Page
      </button>
      {[...Array(totalPage)].map((x, i) => (
        <button type="button" onClick={() => jumpToPage(i)}>
          {i + 1}
        </button>
      ))}
      <button type="button" onClick={getNextPage} disabled={page === totalPage}>
        Next Page
      </button>
      {isFetching ? <div>Loading...</div> : null}
    </div>
  );
};

export default Analyses;
