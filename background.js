// When the extension is installed or updated, create a context menu
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "youglish-lookup",
    title: "Search pronunciation on YouGlish",
    contexts: ["selection"]
  });
});

// Listen for context menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "youglish-lookup" && info.selectionText) {
    // Get user's saved settings
    chrome.storage.sync.get(['defaultLanguage', 'openInPopup'], (data) => {
      const language = data.defaultLanguage || 'english';
      const openInPopup = data.openInPopup || false;
      openYouglish(info.selectionText, language, openInPopup);
    });
  }
});

// Open YouGlish page for the selected word or phrase
function openYouglish(text, language, openInPopup) {
  const query = encodeURIComponent(text.trim());
  const url = `https://youglish.com/pronounce/${query}/${language}`;
  
  if (openInPopup) {
    // Open in popup window
    chrome.windows.create({
      url: url,
      type: 'popup',
      width: 500,
      height: 500
    });
  } else {
    // Open in new tab (default)
    chrome.tabs.create({ url });
  }
}