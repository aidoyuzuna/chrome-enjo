chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "checkFlame4o",
    title: "炎上チェック（gpt-4o）",
    contexts: ["selection"]
  });

  chrome.contextMenus.create({
    id: "checkFlame4mini",
    title: "炎上チェック（gpt-4o-mini）",
    contexts: ["selection"]
  });
});


chrome.contextMenus.onClicked.addListener((info, tab) => {
  let model;
  if (info.menuItemId === "checkFlame4o") {
    model = "&model=gpt-4o";
  } else if (info.menuItemId === "checkFlame4mini") {
    model = "&model=gpt-4o-mini";
  }

  if (model) {
    let prompt = `次の文章が炎上するかチェックしてください:\n ${info.selectionText}`;
    let queryParam = encodeURIComponent(prompt);
    let url = `https://chat.openai.com/chat?q=${queryParam}${model}`;

    chrome.tabs.create({ url });
  }
});
