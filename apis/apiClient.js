import axios from "axios";
import { BACKEND_API_URL } from "@env";
import * as SecureStore from "expo-secure-store";

export const apiClient = axios.create({
  baseURL: BACKEND_API_URL,
});

// 요청 인터셉터
// 매 요청마다 SecureStore에서 access 토큰을 읽어서 Authorization 헤더에 붙임
apiClient.interceptors.request.use(
  async (config) => {
    const access = await SecureStore.getItemAsync("access");

    if (access) {
      if (!config.headers) config.headers = {};
      config.headers.Authorization = `Bearer ${access}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터
// access 토큰 만료 시 refresh로 새 access 발급 후, 요청 재시도
// 재발급 실패 시 -> Error("REFRESH_FAILED")
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const data = error.response?.data;
    const code = data?.code;
    const messages = data?.messages;

    // 이미 한 번 재시도한 요청이면 그대로 실패 처리
    if (originalRequest?._retry) {
      return Promise.reject(error);
    }

    const isExpiredToken =
      code === "token_not_valid" &&
      Array.isArray(messages) &&
      messages.some(
        (m) => typeof m.message === "string" && m.message.toLowerCase().includes("token is expired")
      );

    if (!isExpiredToken) {
      // 토큰 만료가 아니라면 공통 처리 없이 그대로 에러 반환
      return Promise.reject(error);
    }

    // 토큰 만료 → refresh 토큰으로 재발급 시도
    originalRequest._retry = true;

    try {
      const refresh = await SecureStore.getItemAsync("refresh");
      if (!refresh) {
        // refresh 자체가 없으면 로그인부터 다시 해야 함
        return Promise.reject(new Error("NO_TOKEN"));
      }

      const refreshResponse = await axios.post(
        `${BACKEND_API_URL}/users/auth/token/refresh/`,
        { refresh },
        { headers: { "Content-Type": "application/json" } }
      );

      const newAccess = refreshResponse.data?.access;
      const newRefresh = refreshResponse.data?.refresh;

      if (!newAccess) {
        return Promise.reject(new Error("REFRESH_FAILED"));
      }

      // 새 토큰 저장
      await SecureStore.setItemAsync("access", newAccess);
      if (newRefresh) {
        await SecureStore.setItemAsync("refresh", newRefresh);
      }

      // 원래 요청 헤더 갱신 후 재요청
      if (!originalRequest.headers) originalRequest.headers = {};
      originalRequest.headers.Authorization = `Bearer ${newAccess}`;

      return apiClient(originalRequest);
    } catch (refreshError) {
      console.log("토큰 재발급 실패 >>>", refreshError.response?.data || refreshError.message);

      // const errMsg = refreshError.response?.data?.error;
      // if (errMsg === "Invalid or expired refresh token") {
      // return Promise.reject(new Error("REFRESH_FAILED"));
      // }

      return Promise.reject(new Error("REFRESH_FAILED"));
    }
  }
);
