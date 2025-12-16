import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchRecord } from "../../apis/records/records";

export const usePatchRecordMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: patchRecord,
        onSuccess: (_, variables) => {
            // 상세 캐시 갱신
            queryClient.invalidateQueries(["record", variables.pk]);
            // 목록 캐시 갱신
            queryClient.invalidateQueries(["records"]);
        },
    });
};