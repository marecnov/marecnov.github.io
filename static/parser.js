function splitHTMLAndScript(text) {
    const scriptRegex = /<script[^>]*>([\s\S]*?)<\/script>/i;
    let isScript = text.match(scriptRegex);
    const script = isScript ? isScript[1] : '';
    const html = text.replace(scriptRegex, '').trim();
    return {
        html: html,
        script: script
    };
}
function fetchContent(elID, url) {
    fetch(url,{method: "GET"})
        .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        } 
        return response.text();
        })
        .then(receivedText => {
        let { html,script } = splitHTMLAndScript(receivedText)
        localStorage.setItem(elID,JSON.stringify({"html":html,"script": script,"timestamp":new Date()}))
        loadContent(elID);
        })
        .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
        document.getElementById(elID).innerText = 'Error loading content';
        });
}
function loadContent(elID){
      const data = JSON.parse(localStorage.getItem(elID))
      document.getElementById(elID).innerHTML = data?.html;
      const script = document.createElement('script');
      script.textContent = data?.script;
      document.getElementById(elID).appendChild(script);
  }
function pumpContent(bundleIds){
    Object.keys(bundleIds).forEach(elID => {
        if((localStorage.getItem(elID,null) != null)){
            if ((new Date() - new Date(JSON.parse(localStorage.getItem(elID)).timestamp))/(1000*60*60)>=24){
                fetchContent(elID, bundleIds[elID]);
            } else{
                loadContent(elID);
            }
        } else{
            fetchContent(elID, bundleIds[elID]);
        }
    })
}

export default pumpContent