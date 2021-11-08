import { useQuery } from "react-query";

import Client from "@fnndsc/chrisapi";

import useAuth from "./useAuth";

type Analysis = {
  id?: number;
  creation_date?: string;
  modification_date?: string;
  name?: string;
  creator_username?: string;
  created_jobs?: number;
  waiting_jobs?: number;
  scheduled_jobs?: number;
  started_jobs?: number;
  registering_jobs?: number;
  finished_jobs?: number;
  errored_jobs?: number;
  cancelled_jobs?: number;
};
type Analyses = {
  data: Analysis[];
  total: number;
};
type useAnalysisReturnType = {
  data: Analyses | undefined;
  isPreviousData: boolean;
  isFetching: boolean;
  isError: boolean;
  isLoading: boolean;
};
type FeedItem = {
  data: { name: string; value: string }[];
};

const fetchAnalyses = (
  client: Client,
  offset = 0,
  name?: string,
  limit?: number
): Promise<Analyses> =>
  client.getFeeds({ offset, name, limit }).then((res) => {
    const feedItems: FeedItem[] = res.collection.items;
    const { total } = res.collection;
    const feedDataArr: Analysis[] = feedItems.map((feedItem) =>
      feedItem.data.reduce(
        (obj, analysis) =>
          Object.assign(obj, { [analysis.name]: analysis.value }),
        {}
      )
    );
    return { data: feedDataArr, total };
  });
export default function useAnalyses(
  offset = 0,
  name?: string,
  limit?: number
): useAnalysisReturnType {
  const { client } = useAuth();
  const {
    data,
    isPreviousData,
    isFetching,
    isError,
    isLoading,
  }: useAnalysisReturnType = useQuery<Analyses>(
    ["feeds", offset, name, limit],
    () => fetchAnalyses(client, offset, name, limit),
    {
      keepPreviousData: true,
    }
  );
  return { data, isPreviousData, isFetching, isError, isLoading };
}
