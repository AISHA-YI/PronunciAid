// Save settings
document.getElementById('save').addEventListener('click', () => {
  const language = document.getElementById('language').value;
  const openInPopup = document.getElementById('openInPopup').checked;
  
  chrome.storage.sync.set({
    defaultLanguage: language,
    openInPopup: openInPopup
  }, () => {
    // Show success message
    const status = document.getElementById('status');
    status.style.display = 'block';
    setTimeout(() => {
      status.style.display = 'none';
    }, 2000);
  });
});

// Load current settings
chrome.storage.sync.get(['defaultLanguage', 'openInPopup'], (data) => {
  document.getElementById('language').value = data.defaultLanguage || 'english';
  document.getElementById('openInPopup').checked = data.openInPopup || false;
});