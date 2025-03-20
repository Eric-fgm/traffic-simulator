import {
  MutationCache,
  QueryClient,
  QueryClientProvider as ReactQueryProvider,
} from "@tanstack/react-query";

const queryClient = new QueryClient({
  mutationCache: new MutationCache({
    onError: (err) => {
      window.alert(`[Error]: ${err.message}`);
    },
  }),
  defaultOptions: {
    queries: {
      retryOnMount: false,
      retry: 1,
    },
  },
});

const QueryClientProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return (
    <ReactQueryProvider client={queryClient}>{children}</ReactQueryProvider>
  );
};

export default QueryClientProvider;
