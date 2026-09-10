/** Premium otel görselleri — yüksek kalite Unsplash crop */
const u = (id, w = 1200) =>
  `https://images.unsplash.com/${id}?w=${w}&q=85&auto=format&fit=crop`;

export const siteImages = {
  hero: {
    home: u("photo-1542314831-068ccd1c72ab", 1920),
    about: u("photo-1520250497591-112f2f40a3da", 1920),
    solutions: u("photo-1564501049412-61c781a8e591", 1920),
    cta: u("photo-1618773994803-cc1139f1f1bf", 1920),
  },
  hotel: {
    lobby: u("photo-1571003123894-1f0594d2b5d9"),
    reception: u("photo-1571003123894-1f0594d2b5d9"),
    suite: u("photo-1631049307264-da0ec9d70304"),
    exterior: u("photo-1582719478250-c89cae4dc85b"),
    restaurant: u("photo-1414235077428-338989a2e8c0"),
    spa: u("photo-1540555700478-4be289fbbe30"),
    team: u("photo-1497366216548-37526070297c"),
    floorPlan: u("photo-1571003123894-1f0594d2b5d9", 1400),
  },
  solutions: {
    hotelio: u("photo-1564501049412-61c781a8e591"),
    web: u("photo-1460925895917-afdab827c52f"),
    social: u("photo-1611162616305-c69b3fa7fbe0"),
    doors: u("photo-1558618666-fcd25c85cd64"),
    textile: u("photo-1631049307264-da0ec9d70304"),
    cleaning: u("photo-1628177142898-93e36e4e3a50"),
    spa: u("photo-1544161515-4ab6ce6db874"),
  },
  projects: {
    one: u("photo-1564501049412-61c781a8e591", 900),
    two: u("photo-1618773994803-cc1139f1f1bf", 900),
    three: u("photo-1582719478250-c89cae4dc85b", 900),
  },
};
