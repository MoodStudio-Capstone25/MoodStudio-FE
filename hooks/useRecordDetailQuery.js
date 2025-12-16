import { useQuery } from "@tanstack/react-query";
import { fetchRecordDetail } from "../apis/records/records";

export const useRecordDetailQuery = (id) => {
    return useQuery({
        queryKey: ["recordDetail", String(id)],
        queryFn: () => fetchRecordDetail(id),
        enabled: !!id,        // id 있을 때만 호출
        retry: 1,
    });
};