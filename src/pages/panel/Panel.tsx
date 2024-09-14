import '@pages/panel/Panel.css';
import React, { useState } from 'react';

export default function Panel(): JSX.Element {
  const [apiResponse, setApiResponse] = useState<string>(''); // State to hold the API response

  // Function to send a message to the content script to extract data
  const extractContent = () => {
    console.log("2. extracting content")
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.id) {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'buttonClicked' });
      }
    });
  };

  // Listen for messages from the background script
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'apiResponse') {
      setApiResponse(message.response); // Set the API response in the panel state
    }
  });

  return (
    <div className="container">
      <h1>Content Extractor</h1>
      <button onClick={extractContent}>Extract Page Content</button>
      <p>API Response: {apiResponse}</p>
    </div>
  );
}