import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "recent_searches_v1";
const MAX = 10;

// 조회
export const loadRecentSearches = async () => {
  const raw = await AsyncStorage.getItem(KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

// 저장
export const saveRecentSearches = async (list) => {
  await AsyncStorage.setItem(KEY, JSON.stringify(list));
};

// 검색어 저장 규칙: trim, 빈값 제외, 중복 제거, 최신순, 최대 MAX개
export const addRecentSearch = async (keyword) => {
  const k = (keyword ?? "").trim();
  if (!k) return await loadRecentSearches();

  const prev = await loadRecentSearches();
  const next = [k, ...prev.filter((x) => x !== k)].slice(0, MAX);

  await saveRecentSearches(next);
  return next;
};

// 삭제
export const deleteRecentSearch = async (keyword) => {
  const prev = await loadRecentSearches();
  const next = prev.filter((x) => x !== keyword);
  await saveRecentSearches(next);
  return next;
};
