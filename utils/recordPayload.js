const splitToArray = (v) => {
    if (!v) return [];
    return v
        .split(/[,/]/g)
        .map((s) => s.trim())
        .filter(Boolean);
};

export const buildCreateRecordPayload = ({
    templateKey,
    category,          // 서버가 문자열 카테고리(예: "영화/드라마")를 받는 경우
    draft,
    thumbnailUrl,      // api_thumbnail에 넣을 값(없으면 null)
}) => {
    return {
        template: templateKey,
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

        story: (draft.scenes || "").trim(),
        scenes: (draft.story || "").trim(),
        thoughts: (draft.thoughts || "").trim(),
    };
};
