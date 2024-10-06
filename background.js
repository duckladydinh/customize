const RULES = [
  {
    from: "fb",
    dest: "https://facebook.com",
  },
  {
    from: "b",
    dest: "https://teamblind.com",
  },
  {
    from: "mk",
    dest: "https://m.manganelo.com/wwww",
  },
  {
    from: "mg",
    dest: "https://truyenqqviet.com",
  },
  {
    from: "mf",
    dest: "https://ww1.mangafreak.me",
  },
  {
    from: "anime",
    dest: "https://kissanimefree.cc/trending-animes",
  },
  {
    from: "gh",
    dest: "https://github.com",
  },
  {
    from: "cf",
    dest: "https://codeforces.com",
  },
  {
    from: "w",
    dest: "https://docs.google.com",
  },
  {
    from: "doc",
    dest: "https://docs.google.com",
  },
  {
    from: "sheet",
    dest: "https://sheets.google.com",
  },
  {
    from: "slide",
    dest: "https://slides.google.com",
  },
  {
    from: "cloud",
    dest: "https://console.cloud.google.com",
  },
  {
    from: "news",
    dest: "https://news.google.com",
  },
  {
    from: "c",
    dest: "https://calendar.google.com",
  },
  {
    from: "y",
    dest: "https://youtube.com",
  },
  {
    from: "t",
    dest: "https://translate.google.com/?sl=de&tl=en&op=translate",
  },
  {
    from: "vi",
    dest: "https://translate.google.com/?tl=vi&op=translate",
  },
  {
    from: "en",
    dest: "https://translate.google.com/?tl=en&op=translate",
  },
  {
    from: "de",
    dest: "https://translate.google.com/?tl=de&op=translate",
  },
  {
    from: "oald",
    dest: "https://www.oxfordlearnersdictionaries.com",
  },
  {
    from: "ldoce",
    dest: "https://www.ldoceonline.com",
  },
  {
    from: "m",
    dest: "https://gmail.com",
  },
  {
    from: "cs",
    dest: "https://sourcegraph.com/search?&patternType=regexp&case=yes",
  },
  {
    from: "ai",
    dest: "https://chat.openai.com/chat",
  },
];

const FORMATTED_RULES = RULES.map((rule, index) => ({
  id: index + 1,
  priority: 1,
  action: {
    type: "redirect",
    redirect: {
      url: rule.dest,
    },
  },
  condition: {
    urlFilter: "http://" + rule.from + "/",
    resourceTypes: ["main_frame"],
  },
}));

(async () => {
  const oldRules = await chrome.declarativeNetRequest.getDynamicRules();
  const oldRuleIds = oldRules.map((rule) => rule.id);

  await chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: oldRuleIds,
    addRules: FORMATTED_RULES,
  });
})();
