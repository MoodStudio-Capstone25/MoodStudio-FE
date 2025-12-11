import { useQuery } from "@tanstack/react-query";
import { fetchRecords } from "../apis/records/records";

export const useRecordsQuery = () => {
  return useQuery({
    queryKey: ["records"], // 캐시 키
    queryFn: fetchRecords,
    retry: 1, // 실패 시 1번만 재시도 (기본은 3)
  });
};
