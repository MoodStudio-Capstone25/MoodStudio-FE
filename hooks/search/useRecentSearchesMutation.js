import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addRecentSearch, deleteRecentSearch } from "../../apis/search/recentSearch";

// 최근 검색어 추가
export const useAddRecentSearchMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (keyword) => addRecentSearch(keyword),
    onSuccess: (next) => {
      qc.setQueryData(["recentSearches"], next);
    },
  });
};

// 최근 검색어 삭제
export const useDeleteRecentSearchMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (keyword) => deleteRecentSearch(keyword),
    onSuccess: (next) => {
      qc.setQueryData(["recentSearches"], next);
    },
  });
};
