function translateWords() {
  var bodyText = document.body.innerText;
  var matches = bodyText.match(/{(.*?)}/g);

  if (matches) {
    matches.forEach(function(match) {
      chrome.runtime.sendMessage({action: "translateWord", word: match}, function(response) {
        if (response && response.original) { 
          var elements = document.body.getElementsByTagName('*');
          for (var i = 0; i < elements.length; i++) {
            var element = elements[i];
            for (var j = 0; j < element.childNodes.length; j++) {
              var node = element.childNodes[j];
              if (node.nodeType === 3) {
                var text = node.nodeValue;
                var replacedText = text.replace(match, response.original);
                if (replacedText !== text) {
                  var htmlNode = document.createElement('div');
                  htmlNode.innerHTML = response.original;
                  element.replaceChild(htmlNode, node);
                }
              }
            }
          }
        } else {
          console.error('err: ', match); 
        }
      });
    });
  }
}

translateWords();

window.addEventListener('scroll', translateWords);

var observer = new MutationObserver(translateWords);
observer.observe(document, { childList: true, subtree: true }); 
