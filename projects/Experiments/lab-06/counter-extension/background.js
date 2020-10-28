console.log("hello i am bg");

let currentValue = 10;

chrome.runtime.onMessgae.addListener(function(message,sender,sendResponse){
  console.log(message);

  if (message.type == "getCurrentValue"){
    sendResponse({type:"currentValue",value:currentValue});
  } else if (message.type == "increaseValue"){
    currentValue += 1;
  }

  chrome.storage.local.set({currentValue:currentValue},function(){
    console.log("Value is set to",currentValue);
  })

});
