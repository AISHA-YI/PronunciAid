// Save settings
document.getElementById('save').addEventListener('click', () => {
  const language = document.getElementById('language').value;
  
  chrome.storage.sync.set({
    defaultLanguage: language
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
chrome.storage.sync.get('defaultLanguage', (data) => {
  document.getElementById('language').value = data.defaultLanguage || 'english';
});