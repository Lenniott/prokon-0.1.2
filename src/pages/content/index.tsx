import { createRoot } from 'react-dom/client';
import './style.css';
console.log("Content script loaded");
const div = document.createElement('div');
div.id = '__root';
document.body.appendChild(div);

const rootContainer = document.querySelector('#__root');
if (!rootContainer) throw new Error("Can't find Content root element");
const root = createRoot(rootContainer);
root.render(
  <div className='fixed bottom-4 left-4 text-lg text-black bg-amber-400 z-50'  >
    ben is really cool
  </div>
);

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("content script recieved message");
  if (message.action === 'buttonClicked') {

    const content = document.querySelector("main, article, section");
    const elements = content?.querySelectorAll(
      "p, h1, h2, h3, h4, h5, h6, dl, ol, ul, blockquote, table, caption"
    );
    const data: any[] = [];

    function getUniqueSelector(element: Element) {
      if (element.id) {
        return `#${element.id}`;
      }
      const path = [];
      while (element.parentElement) {
        let siblingIndex = 0;
        let sibling = element;
        while (sibling.previousElementSibling) {
          sibling = sibling.previousElementSibling;
          siblingIndex++;
        }
        path.unshift(`${element.tagName}:nth-child(${siblingIndex + 1})`);
        element = element.parentElement;
      }
      return path.join(" > ");
    }
    console.log("data gotten");
    elements?.forEach((element) => {
    
      data.push({
        type: element.tagName,
        text: element.textContent,
        selector: getUniqueSelector(element),
      });
    });

    const url = window.location.href;

    chrome.runtime.sendMessage({
      action: "extractData",
      data: data,
      url: url,
    });
    
  }
  
});
