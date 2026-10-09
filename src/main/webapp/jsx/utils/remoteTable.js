import { queryClient } from "./queryClient";
import { getErrorMessage } from "./mutationFeedback";

// Loader for a material-table in remote mode (`data` given as a function):
// the table passes page, page size and search text, and every change is
// fetched from the server through the shared react-query cache. The next
// page is prefetched so paging forward is instant.
//
// material-table applies whichever response arrives last, and also stores
// that call's page/search as its current query. A response that a newer
// request has superseded (e.g. the first page still loading when a search
// is typed) is therefore never delivered: its promise stays pending.
export const remoteTableLoader = ({ queryKey, fetchPage, toPage }) => {
  let latestCall = 0;

  return (tableQuery) => {
    const call = ++latestCall;
    const params = {
      page: tableQuery.page,
      pageSize: tableQuery.pageSize,
      search: (tableQuery.search || "").trim(),
    };
    const load = (p) => queryClient.fetchQuery([queryKey, p], () => fetchPage(p));
    const superseded = () => call !== latestCall;

    return load(params).then(
      (response) => {
        if (superseded()) return new Promise(() => {});
        const page = toPage(response, params);
        if ((params.page + 1) * params.pageSize < page.totalCount) {
          const next = { ...params, page: params.page + 1 };
          queryClient.prefetchQuery([queryKey, next], () => fetchPage(next));
        }
        return page;
      },
      // The table shows the rejection's message; give it the server's reason.
      (error) =>
        superseded() ? new Promise(() => {}) : Promise.reject(new Error(getErrorMessage(error)))
    );
  };
};
