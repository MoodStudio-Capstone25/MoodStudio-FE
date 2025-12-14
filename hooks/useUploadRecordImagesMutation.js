import { useMutation } from "@tanstack/react-query";
import { uploadRecordImages } from "../apis/records/records";

export const useUploadRecordImagesMutation = () => {
    return useMutation({
        mutationFn: uploadRecordImages,
    });
};
