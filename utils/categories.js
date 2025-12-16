export const categories = [
  { id: "book", label: "책" },
  { id: "movie", label: "영화/드라마" },
  { id: "webtoon", label: "웹툰/웹소설/만화" },
  { id: "music", label: "음악" },
  { id: "audio", label: "팟캐스트/오디오" },
  { id: "game", label: "게임" },
  { id: "documentary", label: "강의/다큐멘터리" },
  { id: "etc content", label: "기타 콘텐츠" },

  { id: "art", label: "전시/아트 페어" },
  { id: "musical", label: "연극/뮤지컬" },
  { id: "concert", label: "콘서트/음악 페스티벌" },
  { id: "sport", label: "스포츠 경기" },
  { id: "festival", label: "축제" },
  { id: "dance", label: "무용/발레" },
  { id: "classic", label: "클래식/국악 공연" },
  { id: "cultures", label: "체험형 문화활동" },
  { id: "etc culture", label: "기타 문화" },

  { id: "etc", label: "기타 카테고리" },
];

// 빠른 변환용 맵
export const labelToIdMap = categories.reduce((acc, cur) => {
  acc[cur.label] = cur.id;
  return acc;
}, {});

export const idToLabelMap = categories.reduce((acc, cur) => {
  acc[cur.id] = cur.label;
  return acc;
}, {});

// record.category(라벨) -> id
export const categoryLabelToId = (label) => {
  if (!label) return "etc";
  return labelToIdMap[label] ?? "etc";
};
