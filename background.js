const RULES = [
    {
        from: "http://fb",
        dest: 'https://facebook.com',
    },
    {
        from: "http://b",
        dest: 'https://teamblind.com',
    },
    {
        from: "http://mk",
        dest: 'https://m.manganelo.com/wwww',
    },
    {
        from: "http://mg",
        dest: 'https://truyenqqviet.com',
    },
    {
        from: "http://mf",
        dest: 'https://ww1.mangafreak.me',
    },
    {
        from: "http://anime",
        dest: 'https://kissanimefree.cc/trending-animes',
    },
    {
        from: "http://gh",
        dest: 'https://github.com',
    },
    {
        from: "http://cf",
        dest: 'https://codeforces.com',
    },
    {
        from: "http://w",
        dest: 'https://docs.google.com',
    },
    {
        from: "http://doc",
        dest: 'https://docs.google.com',
    },
    {
        from: "http://sheet",
        dest: 'https://sheets.google.com',
    },
    {
        from: "http://slide",
        dest: 'https://slides.google.com',
    },
    {
        from: "http://cloud",
        dest: 'https://console.cloud.google.com',
    },
    {
        from: "http://news",
        dest: 'https://news.google.com',
    },
    {
        from: "http://c",
        dest: 'https://calendar.google.com',
    },
    {
        from: "http://y",
        dest: 'https://youtube.com',
    },
    {
        from: "http://t",
        dest: 'https://translate.google.com/?sl=de&tl=en&op=translate',
    },
    {
        from: "http://vi",
        dest: 'https://translate.google.com/?tl=vi&op=translate',
    },
    {
        from: "http://en",
        dest: 'https://translate.google.com/?tl=en&op=translate',
    },
    {
        from: "http://de",
        dest: 'https://translate.google.com/?tl=de&op=translate',
    },
    {
        from: "http://oald",
        dest: 'https://www.oxfordlearnersdictionaries.com',
    },
    {
        from: "http://ldoce",
        dest: 'https://www.ldoceonline.com',
    },
    {
        from: "http://m",
        dest: 'https://gmail.com',
    },
    {
        from: "http://cs",
        dest: 'https://sourcegraph.com/search?&patternType=regexp&case=yes',
    },
    {
        from: "http://ai",
        dest: 'https://chat.openai.com/chat',
    },
];

const FORMATTED_RULES = RULES.map((rule, index) => ({
    id: index + 1,
    priority: 1,
    action: {
        type: "redirect",
        redirect: {
            url: rule.dest
        }
    },
    condition: {
        urlFilter: rule.from,
        resourceTypes: [
            "main_frame"
        ]
    }
}));

(async () => {
    const oldRules = await chrome.declarativeNetRequest.getDynamicRules();
    const oldRuleIds = oldRules.map(rule => rule.id);

    await chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: oldRuleIds,
        addRules: FORMATTED_RULES
    });
})();
