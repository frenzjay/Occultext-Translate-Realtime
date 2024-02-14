chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.action == "translateWord") {
      var encodedWord = btoa(request.word);
      fetch('https://frenzvalios.com/api/occultext/translate/apikey/61135?occultext=' + encodedWord)
        .then(response => response.json())
        .then(data => {
          sendResponse({original: data.original});
        })
        .catch(error => {
          console.error("error:", error); 
          sendResponse({});
        });
      return true;
    }
  }
);
