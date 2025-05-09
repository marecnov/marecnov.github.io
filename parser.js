function loadContent(socketID, data){
    const container = document.getElementById(socketID);
    if (data.html) {
        container.innerHTML = data.html; 
        return;
    }
    if (data.src) {
        const script = document.createElement('script');
        script.src = `/bundles/${data.src}`;
        container.append(script);
        return;
    }
    if (data.href && !document.querySelector(`link[href="/bundles/${data.href}"]`)) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = `/bundles/${data.href}`;
        document.head.append(link);
    }    
}

export default function parser(socketID,parser_data){
    if(parser_data.html){
        const htmlIndex = parser_data.html[1] && window.location.pathname.startsWith("/ru") ? 1 : 0;
            loadContent(socketID,{ html: parser_data.html[htmlIndex] });
    }
    parser_data.css?.forEach((href) => 
        loadContent(socketID, { href })
    );
    parser_data.scripts?.forEach((src) => 
        loadContent(socketID, { src })
    );
}
