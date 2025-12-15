import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createRecord } from "../apis/records/records";

export const useCreateRecordMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createRecord,
        onSuccess: () => {
            // 글 생성 후 목록 캐시 무효화 → 자동 재조회
            queryClient.invalidateQueries({ queryKey: ["records"] });
        },
    });
};
