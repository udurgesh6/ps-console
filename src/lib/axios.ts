// lib/axios.ts
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import Cookies from "js-cookie";
import { getBaseApiUrl } from "../config/constants";
import type { ApiErrorResponse } from "@/types/api";

const baseURL = getBaseApiUrl();
// @ts-nocheck
export const apiClient = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (request) => {
    const accessToken = Cookies.get("accessToken");
    if (accessToken) {
      request.headers.Authorization = `Bearer ${accessToken}`;
    }
    return request;
  },
  (error) => Promise.reject(error)
);

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

// Add a promise to prevent concurrent refreshes
let refreshPromise: Promise<string> | null = null;

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<ApiErrorResponse>) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;
    
    const isAuthEndpoint =
      originalRequest?.url?.includes("/login") ||
      originalRequest?.url?.includes("/request-otp") ||
      originalRequest?.url?.includes("/refresh");

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      !isAuthEndpoint
    ) {
      originalRequest._retry = true;

      // If refresh is already in progress, wait for it
      if (refreshPromise) {
        try {
          await refreshPromise;
          const accessToken = Cookies.get("accessToken");
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return apiClient(originalRequest);
        } catch {
          return Promise.reject(error);
        }
      }

      // Start new refresh
      refreshPromise = (async () => {
        try {
          const refreshToken = Cookies.get("refreshToken");
          const response = await apiClient.post("/auth/refresh", {
            refreshToken,
          });

          const { accessToken, refreshToken: newRefreshToken } = response.data;
          
          const cookieOptions = {
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict' as const,
            expires: 7,
          };
          
          Cookies.set("accessToken", accessToken, cookieOptions);
          Cookies.set("refreshToken", newRefreshToken, cookieOptions);

          apiClient.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
          
          return accessToken;
        } catch (refreshError) {
          console.error("Token refresh failed:", {
            error: refreshError,
            originalUrl: originalRequest?.url,
            timestamp: new Date().toISOString(),
          });
          Cookies.remove("accessToken");
          Cookies.remove("refreshToken");
          Cookies.remove("user");
          Cookies.remove("tenant");
          window.location.href = "/login";
          throw refreshError;
        } finally {
          refreshPromise = null;
        }
      })();

      try {
        await refreshPromise;
        return apiClient(originalRequest);
      } catch {
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export const api = {
  get: <T>(url: string) => apiClient.get<T>(url).then((res) => res.data),
  post: <T, D = unknown>(url: string, data?: D) =>
    apiClient.post<T>(url, data).then((res) => res.data),
  put: <T, D = unknown>(url: string, data?: D) =>
    apiClient.put<T>(url, data).then((res) => res.data),
  delete: <T>(url: string) => apiClient.delete<T>(url).then((res) => res.data),
};
