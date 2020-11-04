total_point = 0;
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (request.type == "end_of_match"){
          console.log("point_earned_here:",request.message);
          let message = {key:"end",info:"score_saved"}
          total_point += request.message;
          sendResponse(message);}
        else if (request.type == "start_of_match"){
          let message = {key:"start",info:total_point}
          console.log("The point earned before was",total_point);
          sendResponse(message);
        }else if(request.type == "finish_fuel"){
          console.log("Finish fueling, start by",request.message);
          total_point = request.message;
  
        }

        //   chrome.tabs.query({
        //       active: true,
        //       currentWindow: true
        //   }, (tabs) => {
        //       let message = {
        //         key:"send_score", info:total_point
        //       };
        //       console.log("The point earned before was",total_point);
        //       chrome.tabs.sendMessage(tabs[0].id, message, res => {
        //           console.log('bg=>content')
        //           console.log(res)
        //       })
        //   })
        //
        // }
        //
});
