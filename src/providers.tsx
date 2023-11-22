import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export const ReactQueryProvider = ({
  children,
}: {
  children: React.ReactNode | Array<React.ReactNode>;
}) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
