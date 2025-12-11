import { apiClient } from "../apiClient";

export const fetchRecords = async () => {
  const response = await apiClient.get("/records/");
  return response.data;
};
