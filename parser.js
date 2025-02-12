function digestion(text){
    const scriptRegex = /<script[^>]*>([\s\S]*?)<\/script>/i
    let res = {html: "",script: {}};
    while( text.match(scriptRegex) != null){
        let a = text.match(scriptRegex)
        if(a[1]){
            res.script.txt = a[1]
        } else {
            let srcRegex = /<script\s+(?:[^>]*?\s+)?src=(['"])(.*?)\1[^>]*>/i
            res.script.src = a[0].match(srcRegex)[2]
        }
        text = text.replace(scriptRegex, '').trim()
    }
    res.html = text
    return res
}
const lang = (alter = 0) => alter ? (window.location.pathname.startsWith("/ru") ? "" : "Ru") : (window.location.pathname.startsWith("/ru") ? "Ru" : "");
const storageKey = (socketID, alter = 0) => socketID + lang(alter);
const getStorageItem = (socketID, alter = 0) => localStorage.getItem(storageKey(socketID, alter)) ? JSON.parse(localStorage.getItem(storageKey(socketID,alter))) : null;
function fetchContent(socketID, url) {
    fetch(url,{method: "GET"})
        .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        } 
        return response.text();
        })
        .then(receivedText => {
            let {html, script} = digestion(receivedText)
            localStorage.setItem(storageKey(socketID),JSON.stringify({"html":html,"script":script,"timestamp":new Date()}))
            loadContent(socketID);
        })
        .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
        document.getElementById(socketID).innerText = 'Error loading content';
        });
}
function loadContent(socketID){
    const data = getStorageItem(socketID);
    const container = document.getElementById(socketID);
    container.innerHTML = data?.html;
    if(data?.script.txt != null){
        let script1 = document.createElement('script')
        script1.textContent = data.script.txt;
        container.appendChild(script1);
    }
    if(data?.script.src != null){
        let script2 = document.createElement('script')
        script2.src = data.script.src;
        container.appendChild(script2);
    }
}
// parser("bioSocket,'https://marecnov.github.io/bundles/bio/")
function parser(socketID,url){
    const storageData = getStorageItem(socketID);
    const shouldFetchContent = !storageData || 
        (Date.now() - new Date(storageData.timestamp)) >= 24 * 60 * 60 * 1000;
    shouldFetchContent ? fetchContent(socketID, `${url}index${lang()}.html`) : loadContent(socketID);
    
    const alterStorageData = getStorageItem(socketID,1);
    const shouldDeleteAlterContent = !alterStorageData || 
        (Date.now() - new Date(alterStorageData.timestamp)) >= 24 * 60 * 60 * 1000;
    shouldDeleteAlterContent ? localStorage.removeItem(storageKey(socketID,1)) : null;
}

export default parser
