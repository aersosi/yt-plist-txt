document.addEventListener('DOMContentLoaded', function() {
  const downloadButton = document.getElementById('download-button');

  downloadButton.addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        files: ['content.js']
      });
    });
  });

  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.urls) {
      const blob = new Blob([request.urls.join('\n')], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'playlist_urls.txt';
      a.click();
      URL.revokeObjectURL(url);
    }
  });
});