export const threeDItems = [
  { key: "ball1", labelKo: "공1", image: require("../assets/images/3d-items/ball1.png") },
  { key: "ball2", labelKo: "공2", image: require("../assets/images/3d-items/ball2.png") },
  { key: "ball3", labelKo: "공3", image: require("../assets/images/3d-items/ball3.png") },

  // { key: "balloon", labelKo: "풍선", image: require("../assets/images/3d-items/balloon.png") },

  { key: "book1", labelKo: "책1", image: require("../assets/images/3d-items/book1.png") },
  { key: "book2", labelKo: "책2", image: require("../assets/images/3d-items/book2.png") },
  { key: "book3", labelKo: "책3", image: require("../assets/images/3d-items/book3.png") },

  { key: "drink1", labelKo: "음료1", image: require("../assets/images/3d-items/drink1.png") },
  { key: "drink2", labelKo: "음료2", image: require("../assets/images/3d-items/drink2.png") },

  { key: "game1", labelKo: "게임1", image: require("../assets/images/3d-items/game2.png") },
  { key: "game2", labelKo: "게임2", image: require("../assets/images/3d-items/game1.png") },

  // { key: "hotdog", labelKo: "핫도그", image: require("../assets/images/3d-items/hotdog.png") },
  {
    key: "icecream",
    labelKo: "아이스크림",
    image: require("../assets/images/3d-items/icecream.png"),
  },

  { key: "movie1", labelKo: "영화1", image: require("../assets/images/3d-items/movie3.png") },
  { key: "movie2", labelKo: "영화2", image: require("../assets/images/3d-items/movie1.png") },
  // { key: "movie3", labelKo: "영화3", image: require("../assets/images/3d-items/movie3.png") },

  { key: "music1", labelKo: "음악1", image: require("../assets/images/3d-items/music4.png") },
  { key: "music2", labelKo: "음악2", image: require("../assets/images/3d-items/music2.png") },
  { key: "music3", labelKo: "음악3", image: require("../assets/images/3d-items/music1.png") },
  { key: "music4", labelKo: "음악4", image: require("../assets/images/3d-items/music3.png") },

  { key: "palette", labelKo: "팔레트", image: require("../assets/images/3d-items/palette.png") },
  { key: "pencil", labelKo: "연필", image: require("../assets/images/3d-items/pencil.png") },
  { key: "popcorn", labelKo: "팝콘", image: require("../assets/images/3d-items/popcorn.png") },

  { key: "shoes1", labelKo: "신발1", image: require("../assets/images/3d-items/shoes2.png") },
  { key: "shoes2", labelKo: "신발2", image: require("../assets/images/3d-items/shoes1.png") },

  { key: "trophy", labelKo: "트로피", image: require("../assets/images/3d-items/trophy.png") },
];

export const threeDAssets = threeDItems.reduce((acc, cur) => {
  acc[cur.key] = cur.image;
  return acc;
}, {});

export const threeDLabelKoByKey = threeDItems.reduce((acc, cur) => {
  acc[cur.key] = cur.labelKo;
  return acc;
}, {});
