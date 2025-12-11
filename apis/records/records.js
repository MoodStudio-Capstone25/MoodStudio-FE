import axios from "axios";
import { BACKEND_API_URL } from "@env";
import * as SecureStore from "expo-secure-store";

export const fetchRecords = async () => {
  const access = await SecureStore.getItemAsync("access");
  const refresh = await SecureStore.getItemAsync("refresh");

  if (!access || !refresh) {
    // React Query에서 에러로 잡히게 던짐
    throw new Error("NO_TOKEN");
  }

  // 1차 요청: 기존 access 토큰으로 요청
  try {
    const response = await axios.get(`${BACKEND_API_URL}/records/`, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });
    return response.data;
  } catch (error) {
    const data = error.response?.data;
    const code = data?.code;
    const messages = data?.messages;

    const isExpiredToken =
      code === "token_not_valid" &&
      Array.isArray(messages) &&
      messages.some(
        (m) => typeof m.message === "string" && m.message.toLowerCase().includes("token is expired")
      );

    if (!isExpiredToken) {
      console.log("GET /records/ 에러:", data || error.message);
      throw error;
    }

    // access 만료 → refresh로 새 access 발급
    try {
      const refreshResponse = await axios.post(
        `${BACKEND_API_URL}/users/auth/token/refresh/`,
        { refresh },
        { headers: { "Content-Type": "application/json" } }
      );

      const newAccess = refreshResponse.data?.access;
      const newRefresh = refreshResponse.data?.refresh;

      if (!newAccess) {
        throw new Error("새 access 토큰을 받지 못했습니다.");
      }

      // 새 토큰 저장
      await SecureStore.setItemAsync("access", newAccess);
      if (newRefresh) {
        await SecureStore.setItemAsync("refresh", newRefresh);
      }

      // 2차 요청: 새 access 토큰으로 재요청
      const retryResponse = await axios.get(`${BACKEND_API_URL}/records/`, {
        headers: {
          Authorization: `Bearer ${newAccess}`,
        },
      });

      return retryResponse.data;
    } catch (refreshError) {
      console.log("토큰 재발급 실패 >>>", refreshError.response?.data || refreshError.message);

      //   const errMsg = refreshError.response?.data?.error;
      //   if (errMsg === "Invalid or expired refresh token") {
      //     throw new Error("REFRESH_FAILED");
      //   }

      throw new Error("REFRESH_FAILED");
    }
  }
};
