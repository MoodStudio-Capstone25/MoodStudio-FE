const splitToArray = (v) => {
    if (!v) return [];
    return v
        .split(/[,/]/g)
        .map((s) => s.trim())
        .filter(Boolean);
};

export const buildCreateRecordPayload = ({
    // templateKey,
    category,          // 서버가 문자열 카테고리(예: "영화/드라마")를 받는 경우
    draft,
    thumbnailUrl,      // api_thumbnail에 넣을 값(없으면 null)
}) => {
    return {
        template: "content",
        category,
        content_title: draft.content_title?.trim() || "",
        title: draft.title?.trim() || "",
        api_thumbnail: thumbnailUrl || null,

        rating: Number(draft.rating) || 0,

        date: draft.date?.trim() || null,

        creator: splitToArray(draft.creator),
        cast: splitToArray(draft.cast),

        location: draft.location?.trim() || null,
        companions: draft.companions?.trim() || null,

        story: (draft.scenes || "").trim(),    // 줄거리/개요
        scenes: (draft.story || "").trim(),    // 기억에 남는 장면/문장
        thoughts: (draft.thoughts || "").trim(),
    };
};
