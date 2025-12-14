import { useQuery } from "@tanstack/react-query";
import { loadRecentSearches } from "../../apis/search/recentSearch";

export const useRecentSearchesQuery = () => {
  return useQuery({
    queryKey: ["recentSearches"],
    queryFn: loadRecentSearches,
    staleTime: Infinity,
    gcTime: Infinity,
  });
};
