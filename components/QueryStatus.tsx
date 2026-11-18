import React from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Button,
  TouchableOpacity,
} from "react-native";
import type { UseQueryResult } from "@tanstack/react-query";
import axios from "axios";
import { Colors } from "@/constants/Colors";

// Props for QueryStatus
export type QueryStatusProps<T> =
  | {
      query:
        | UseQueryResult<T>
        | {
            data: T;
            isLoading: boolean;
            isError?: boolean;
            error?: unknown;
            refetch?: () => void;
          };
      onWithLoadingState: (data: T, isLoading: boolean) => React.ReactElement;
      onError?:
        | React.ReactElement
        | ((
            error: unknown,
            refetch: () => void,
            isLoading: boolean
          ) => React.ReactElement);
      onLoading?: never;
      onEmpty?: never;
      onSuccess?: never;
    }
  | {
      query:
        | UseQueryResult<T>
        | {
            data: T;
            isLoading: boolean;
            isError?: boolean;
            error?: unknown;
            refetch?: () => void;
          };
      onLoading?: React.ReactElement;
      onError?:
        | React.ReactElement
        | ((
            error: unknown,
            refetch: () => void,
            isLoading: boolean
          ) => React.ReactElement);
      onEmpty?: React.ReactElement;
      onSuccess: (data: NonNullable<T>) => React.ReactElement;
      onWithLoadingState?: never;
    };

function hasOnWithLoadingState<T>(props: QueryStatusProps<T>): props is {
  query:
    | UseQueryResult<T>
    | {
        data: T;
        isLoading: boolean;
        isError?: boolean;
        error?: unknown;
        refetch?: () => void;
      };
  onWithLoadingState: (data: T, isLoading: boolean) => React.ReactElement;
  onError?:
    | React.ReactElement
    | ((
        error: unknown,
        refetch: () => void,
        isLoading: boolean
      ) => React.ReactElement);
} {
  return (
    "onWithLoadingState" in props &&
    typeof props.onWithLoadingState === "function"
  );
}

const DefaultLoader = () => (
  <View
    style={{
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      padding: 16,
    }}
  >
    <ActivityIndicator size="small" color={Colors.primary} />
  </View>
);

// Error helpers and message extraction for React Native
function isUnauthorized(err: unknown): boolean {
  if (axios.isAxiosError(err)) {
    return err.response?.status === 401;
  }
  return false;
}

export function isNetworkError(err: unknown): boolean {
  if (axios.isAxiosError(err)) {
    return !err.response && err.code === "ERR_NETWORK";
  }
  return false;
}

function getErrorMessage(err: unknown): string {
  if (axios.isAxiosError(err)) {
    if (err.response?.data?.message) {
      return err.response.data.message;
    }
    return "An error occurred while communicating with the server.";
  }
  if (err instanceof Error) {
    return err.message;
  }
  return "An unexpected error occurred.";
}

// Native ErrorCard for QueryStatus
const ErrorCardNative = (
  error: unknown,
  refetch: () => void,
  isLoading: boolean
) => {
  // Placeholder logout logic
  const onLogout = () => {
    // TODO: Implement logout logic
  };
  const message = getErrorMessage(error);
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
        borderWidth: 1,
        borderColor: "#f87171",
        borderRadius: 8,
        backgroundColor: "#fff0f0",
        margin: 8,
      }}
    >
      <Text
        style={{
          fontSize: 20,
          color: "#dc2626",
          marginBottom: 4,
          fontWeight: "bold",
          flexDirection: "row",
          textAlign: "center",
        }}
      >
        <Text style={{ fontSize: 22 }}>❗</Text> Error
      </Text>
      <Text style={{ color: "#dc2626", marginBottom: 12, textAlign: "center" }}>
        {message}
      </Text>
      <View style={{ flexDirection: "row", gap: 12 }}>
        {isUnauthorized(error) ? (
          <TouchableOpacity
            onPress={onLogout}
            disabled={isLoading}
            style={{
              borderWidth: 1,
              borderColor: "#dc2626",
              borderRadius: 6,
              paddingVertical: 8,
              paddingHorizontal: 18,
              backgroundColor: isLoading ? "#fca5a5" : "#fff",
              marginHorizontal: 4,
            }}
          >
            <Text style={{ color: "#dc2626", fontWeight: "bold" }}>Logout</Text>
          </TouchableOpacity>
        ) : isNetworkError(error) ? (
          <TouchableOpacity
            onPress={refetch}
            disabled={isLoading}
            style={{
              borderWidth: 1,
              borderColor: "#2563eb",
              borderRadius: 6,
              paddingVertical: 8,
              paddingHorizontal: 18,
              backgroundColor: isLoading ? "#93c5fd" : "#fff",
              marginHorizontal: 4,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 18, marginRight: 6 }}>
              {isLoading ? "🔄" : "🔁"}
            </Text>
            <Text style={{ color: "#2563eb", fontWeight: "bold" }}>
              No Network – Try Again
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={refetch}
            disabled={isLoading}
            style={{
              borderWidth: 1,
              borderColor: "#2563eb",
              borderRadius: 6,
              paddingVertical: 8,
              paddingHorizontal: 18,
              backgroundColor: isLoading ? "#93c5fd" : "#fff",
              marginHorizontal: 4,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 18, marginRight: 6 }}>
              {isLoading ? "🔄" : "🔁"}
            </Text>
            <Text style={{ color: "#2563eb", fontWeight: "bold" }}>
              Try Again
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const DefaultEmpty = () => (
  <View style={{ alignItems: "center", justifyContent: "center", padding: 16 }}>
    <Text>No data found.</Text>
  </View>
);

export function QueryStatus<T>(props: QueryStatusProps<T>): React.ReactElement {
  const { query } = props;
  // Support both useQuery and useFetch shape, with defensive checks
  const isObject = query && typeof query === "object";
  const isLoading = isObject && "isLoading" in query ? query.isLoading : false;
  const isError =
    isObject && "isError" in query
      ? query.isError
      : isObject && "error" in query
      ? !!query.error
      : false;
  const error = isObject && "error" in query ? query.error : undefined;
  const refetch =
    isObject && "refetch" in query && typeof query.refetch === "function"
      ? query.refetch
      : () => {};
  const data = isObject && "data" in query ? query.data : undefined;

  if (hasOnWithLoadingState(props)) {
    if (isError && props.onError) {
      return typeof props.onError === "function"
        ? props.onError(error, refetch, isLoading)
        : props.onError;
    }
    return props.onWithLoadingState(data as T, isLoading);
  }

  const {
    onLoading = <DefaultLoader />,
    onError = ErrorCardNative,
    onEmpty = <DefaultEmpty />,
    onSuccess,
  } = props;

  if (isLoading) {
    return onLoading;
  }

  if (isError) {
    return typeof onError === "function"
      ? onError(error, refetch, isLoading)
      : onError;
  }

  const isEmptyData = (data: unknown): boolean =>
    data === undefined ||
    data === null ||
    (Array.isArray(data) && data.length === 0);

  if (isEmptyData(data) && onEmpty) {
    return onEmpty;
  }

  return onSuccess(data as NonNullable<T>);
}
