const urls = Array.from(document.querySelectorAll('ytd-playlist-video-renderer a#video-title'))
  .map(link => link.href)
  .filter(href => href.includes('&list'))
  .map(href => {
    const url = new URL(href);
    const videoId = url.searchParams.get('v');
    return `https://www.youtube.com/watch?v=${videoId}`;
  });

chrome.runtime.sendMessage({ urls });