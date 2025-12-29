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
    // Get user's saved language preference from storage
    chrome.storage.sync.get('defaultLanguage', (data) => {
      const language = data.defaultLanguage || 'english';  // Default to English if not set
      openYouglish(info.selectionText, language);
    });
  }
});

// Open YouGlish page for the selected word or phrase
function openYouglish(text, language) {  // Accept language as parameter
  const query = encodeURIComponent(text.trim());  // URL encode the text
  const url = `https://youglish.com/pronounce/${query}/${language}`;  // Build URL with language
  chrome.tabs.create({ url });  // Open in new tab
}