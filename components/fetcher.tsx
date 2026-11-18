import type { UseQueryOptions } from "@tanstack/react-query";
import type { QUERY_KEYS } from "@/lib/query";
import type {
  InferQueryData,
  InferQueryParams,
  InferSearchParams,
} from "@/lib/query/query.utils";
import React from "react";
import { useTypedFetch } from "@/lib/query";
import { QueryStatus } from "@/components/QueryStatus";

// Only allow top-level keys of QUERY_KEYS
export type FetcherKey = keyof typeof QUERY_KEYS;

// Props for the Fetcher component with proper type safety
export type FetcherProps<K extends FetcherKey = FetcherKey> = {
  // Query configuration with full typing
  query: {
    key: K;
    params?: InferQueryParams<(typeof QUERY_KEYS)[K]>;
  };
  // Type-safe parameters based on the specific query definition
  params?: InferQueryParams<(typeof QUERY_KEYS)[K]>;
  searchParams?: InferSearchParams<(typeof QUERY_KEYS)[K]>;
  options?: Partial<
    UseQueryOptions<InferQueryData<(typeof QUERY_KEYS)[K]>, Error>
  >;
} & (
  | {
      // Unified mode: onWithLoadingState is required
      onWithLoadingState: (
        data: InferQueryData<(typeof QUERY_KEYS)[K]>,
        isLoading: boolean
      ) => React.JSX.Element;
      onError?:
        | React.JSX.Element
        | ((
            error: unknown,
            refetch: () => void,
            isLoading: boolean
          ) => React.JSX.Element);
      // Disallow separate handlers in unified mode
      onLoading?: never;
      onEmpty?: never;
      onSuccess?: never;
    }
  | {
      // Separate handlers mode: onSuccess is required
      onLoading?:
        | React.JSX.Element
        | ((className?: string, loaderClassName?: string) => React.JSX.Element);
      onError?:
        | React.JSX.Element
        | ((
            error: unknown,
            refetch: () => void,
            isLoading: boolean
          ) => React.JSX.Element);
      onEmpty?: React.JSX.Element;
      onSuccess: (
        data: NonNullable<InferQueryData<(typeof QUERY_KEYS)[K]>>
      ) => React.JSX.Element;
      // Disallow unified mode
      onWithLoadingState?: never;
    }
);

/**
 * Fetcher component that combines useTypedFetch with QueryStatus
 * Provides a clean API for data fetching with automatic status handling
 */
export default function Fetcher<K extends FetcherKey>(props: FetcherProps<K>) {
  const {
    query: queryConfig,
    params,
    searchParams,
    options,
    ...statusProps
  } = props;

  console.log("Fetcher queryConfig:", queryConfig);
  console.log("Fetcher params:", params);

  // Use the typed fetch hook with the new config pattern
  const effectiveParams = queryConfig.params ?? params;
  const query = useTypedFetch(queryConfig.key, {
    params: effectiveParams,
    searchParams,
    options,
  });

  // Pass the query result to QueryStatus with the status props
  return <QueryStatus query={query as any} {...(statusProps as any)} />;
}
