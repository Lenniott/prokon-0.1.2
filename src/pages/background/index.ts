console.log('1. background script loaded');

// Set panel behavior to open side panel when the extension action is clicked
chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error));


async function sendDataToAPI(data: any[], url: string) {
  try {
    const response = await fetch('http://localhost:3000/api/echo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data, url }),  // Sending extracted data and URL
    });

    const responseData = await response.json();
    console.log('Response from API:', responseData);
    
    // You can send the API response back to the content script or panel if needed
    return responseData;
  } catch (error) {
    console.error('Error sending data to API:', error);
    return { error: 'Error sending data to API' };
  }
}

// Listen for messages from the content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log(message)
  if (message.action === 'extractData') {
    console.log('Extracted data:', message.data);
    console.log('URL:', message.url);

    // Send the extracted data and URL to the API
    sendDataToAPI(message.data, message.url).then((apiResponse) => {
      console.log('API Response:', apiResponse);
      // Optionally, send response back to the content script or panel
      sendResponse(apiResponse);
    });

    // Returning true to keep the message channel open for async response
    return true;
  }
});