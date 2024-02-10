chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (request.action == "translateWord") {
        var encodedWord = btoa(request.word);
        fetch('https://frenzvalios.com/api/occultext/translate/apikey/61135?gibberish=' + encodedWord)
          .then(response => response.json())
          .then(data => {
            sendResponse({original: data.original});
          });
        return true;
      }
    }
  );
  
