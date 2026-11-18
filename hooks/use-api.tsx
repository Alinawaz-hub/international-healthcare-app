import { useMutation } from "@tanstack/react-query";
import axios, { AxiosProgressEvent } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getData } from "@/utils/storage";

type DataRequestType<T> = {
  path: string;
  data?: T;
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void;
};

type ApiResponse<R> = {
  message: string;
  data: R;
};

type MutationFunction<T, R = any> = {
  data?: T;
  path: string;
  onSuccess?: (data: R) => void;
  onError?: (error: any) => void;
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void;
};

interface IUsePostApi<T> {
  key?: string | T;
  isSuccessToast?: boolean;
  method?: "post" | "put" | "delete" | "patch";
}

const useApi = <T,>({
  isSuccessToast = true,
  key,
  method = "post",
}: IUsePostApi<T> = {}) => {
  const API_URL = "https://afia-backend.hasseebmayo.com/api/v1/";

  const headers = async (data?: any) => {
    const token = await getData<string>("accessToken");
    // Only set Content-Type if not FormData
    const isFormData =
      typeof FormData !== "undefined" && data instanceof FormData;
    return {
      Authorization: token ? `Bearer ${token}` : "",
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
    };
  };

  // General API request function to handle different methods
  const apiRequest = async ({
    data,
    path,
    onUploadProgress,
  }: DataRequestType<T>) => {
    const REQUEST_PATH = `${API_URL}${path}`;
    const config = {
      headers: await headers(data),
      onUploadProgress,
    };

    switch (method) {
      case "post":
        return axios.post<ApiResponse<any>>(REQUEST_PATH, data, config);
      case "put":
        return axios.put<ApiResponse<any>>(REQUEST_PATH, data, config);
      case "delete":
        return axios.delete<ApiResponse<any>>(REQUEST_PATH, config);
      case "patch":
        return axios.patch<ApiResponse<any>>(REQUEST_PATH, data, config);
      default:
        throw new Error("Invalid method provided");
    }
  };

  const { mutate, isPending } = useMutation({
    mutationFn: apiRequest,
    mutationKey: [key],
  });

  const onRequest = <R = any,>({
    data,
    path,
    onError = () => {},
    onSuccess = () => {},
    onUploadProgress,
  }: MutationFunction<T, R>) => {
    mutate(
      {
        path,
        data,
        onUploadProgress,
      },
      {
        onSuccess: (response) => {
          if (isSuccessToast) {
            // Add success toast if needed
          }
          console.log(response);
          onSuccess(response.data.data);
        },
        onError: (error: any) => {
          console.error("API error:", error);
          onError(error);
        },
      }
    );
  };

  return {
    onRequest,
    isPending,
  };
};

export default useApi;
