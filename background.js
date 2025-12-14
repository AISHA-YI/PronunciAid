// When the extension is installed or updated, create a context menu
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "youglish-lookup",
    title: "Search pronunciation on YouGlish",
    contexts: ["selection"] // Show only when text is selected
  });
});

// Listen for context menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "youglish-lookup" && info.selectionText) {
    openYouglish(info.selectionText);
  }
});

// Listen for the keyboard shortcut (Alt+Y)
chrome.commands.onCommand.addListener((command) => {
  if (command === "open-youglish") {
    // Execute a script in the active tab to get the selected text
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => window.getSelection().toString()
    }, (results) => {
      const selectedText = results?.[0]?.result;
      if (selectedText) openYouglish(selectedText);
    });
  }
});

// Open YouGlish page for the selected word or phrase
function openYouglish(text) {
  const query = encodeURIComponent(text.trim());
  const url = `https://youglish.com/pronounce/${query}/english`;
  chrome.tabs.create({ url });
}
