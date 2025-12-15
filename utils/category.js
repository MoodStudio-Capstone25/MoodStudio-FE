export const categoryToServer = (id) => {
    switch (id) {
        case "book": return "도서";
        case "movie": return "영화/드라마";
        case "webtoon": return "웹툰/웹소설/만화"
        case "music": return "음악";
        case "audio": return "팟캐스트/오디오";
        case "game": return "게임";
        case "documentary": return "강의/다큐멘터리";
        case "etc content": return "기타 콘텐츠";

        case "art": return "전시/아트 페어";
        case "musical": return "연극/뮤지컬";
        case "concert": return "콘서트/음악 페스티벌";
        case "sport": return "스포츠 경기";
        case "festival": return "축제";
        case "dance": return "무용/발레";
        case "classic": return "클래식/국악 공연";
        case "cultures": return "체험형 문화활동";
        case "etc culture": return "기타 문화";

        case "etc": return "기타 카테고리";

        default: return id;
    }
};