chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   if (request.method !== 1) return;

  console.log("hihi", request);

  sendResponse({ message: 'Dog Gif Generated!' });
});
