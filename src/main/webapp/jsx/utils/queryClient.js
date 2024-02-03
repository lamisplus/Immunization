import { QueryClient } from "react-query";


const queryClientSettings = {
    defaultOptions: {
      queries: {
        retry: 2,
        refetchOnMount: true,
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
        cacheTime: Infinity,
        refetchInterval: 3.6e6, //1 hour
        refetchIntervalInBackground: true,
        suspense: false,
        staleTime: Infinity,
      },
      mutations: {
        retry: 2,
      },
    },
  };
  
  export const queryClient = new QueryClient(queryClientSettings);