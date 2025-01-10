chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'captureTab') {      
    
      // Change format to JPEG & 100% quality for a smaller size file size.
    chrome.tabs.captureVisibleTab(null, { format: 'jpeg', quality:100 }, (dataUrl) => {

      sendResponse(dataUrl);
    });
  }
  
  return true;
});
