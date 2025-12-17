import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchRecordElements,
  createElement,
  updateElement,
  deleteElement,
} from "../apis/elements/elementsApis";

export const useRecordElementsQuery = (recordId, options = {}) => {
  return useQuery({
    queryKey: ["recordElements", recordId],
    queryFn: () => fetchRecordElements(recordId),
    enabled: !!recordId, // recordId가 있을 때만
    ...options,
  });
};

// 생성
export const useCreateElementMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body) => createElement(body),
    onSuccess: (newElement) => {
      // 같은 record의 목록 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: ["recordElements", newElement.record],
      });
    },
  });
};

export const useUpdateElementMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, body }) => updateElement(id, body),
    onSuccess: (updated) => {
      queryClient.invalidateQueries({
        queryKey: ["recordElements", updated.record],
      });
    },
  });
};

export const useDeleteElementMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, recordId }) => deleteElement(id),
    onSuccess: (_status, { recordId }) => {
      queryClient.invalidateQueries({
        queryKey: ["recordElements", recordId],
      });
    },
  });
};
