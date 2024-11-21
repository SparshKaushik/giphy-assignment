import {
  QueryClient,
  QueryClientProvider as QCP,
  keepPreviousData,
} from "@tanstack/react-query";
import { type ReactNode } from "react";

export default function QueryClientProvider({
  children,
}: {
  children: ReactNode;
}) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 0,
        placeholderData: keepPreviousData,
      },
    },
  });

  return <QCP client={queryClient}>{children}</QCP>;
}
