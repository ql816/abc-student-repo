

var views = chrome.extension.getViews({type:'popup'});
if(views.length > 0) {
    console.log(views[0].location.href);
};


function test(){
	console.log('I am background');
};

function toPopup() {
    alert('to popup!')
}

function sendMessageToContentScript(message, callback) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, message, (response) => {
            if (callback) {
                callback(response)
            }
        })
    })
}

var visited_web_dict = {};
let response = "hello world";

chrome.storage.local.get(['key'], function(result) {
  if (result.key!= undefined){
    visited_web_dict = result.key;
  }
});

sendMessageToContentScript({ key: 'test', payload: 'Hi, this is a message from popup.js'}, (response) => {
    console.log('this is a message from content script', response);
  });

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        console.log('Recived message from content.js', response);
        if (request.type == "sendURL" && visited_web_dict[request.message] == undefined){
        visited_web_dict[request.message] = 0;
        sendResponse('create new');
      }
        if (request.type == "stay")
        {
          visited_web_dict[request.message] += 1;
          sendResponse('exist! +1');
        }
        let value = visited_web_dict[request.message];

        chrome.storage.local.set({key:visited_web_dict}, function() {
          //console.log('Value is set to ' + value);
        });

    });
