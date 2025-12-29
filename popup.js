// Load current settings on popup open
chrome.storage.sync.get(['defaultLanguage', 'openInPopup'], (data) => {
  const lang = data.defaultLanguage || 'english';
  const openInPopup = data.openInPopup || false;
  
  document.getElementById('language').value = lang;
  document.getElementById('openInPopup').checked = openInPopup;
});

// Save settings
document.getElementById('save').addEventListener('click', () => {
  const button = document.getElementById('save');
  const language = document.getElementById('language').value;
  const openInPopup = document.getElementById('openInPopup').checked;
  
  // Show saving state
  button.textContent = 'Saving...';
  button.classList.add('saving');
  
  chrome.storage.sync.set({
    defaultLanguage: language,
    openInPopup: openInPopup
  }, () => {
    // Show brief success message
    button.textContent = 'Saved!';
    
    // Close popup after short delay
    setTimeout(() => {
      window.close();
    }, 300);
  });
});