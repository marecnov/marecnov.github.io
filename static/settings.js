let modal = document.getElementById("myModal")
let link = document.getElementById("settingsLink")
let span = document.querySelector(".modal-header .close")
let applyBtn = document.querySelector('.modal-footer button')
let inputs = [document.querySelector('.modal-body select'),document.querySelector('.modal-body input')]

link.onclick = function() {
    modal.style.display = "block"
    loadSettings()
}
span.onclick = function() {
    modal.style.display = "none"
}
window.onclick = function(event) {
    if (event.target == modal) {
    modal.style.display = "none"
    }
}
applyBtn.onclick = function(){
    let settings = {
    darkMode: inputs[1].checked ? 'dark' : 'light',
    lang: inputs[0].value
    }
    localStorage.setItem('SETTINGS', JSON.stringify(settings))
    loadSettings()
    modal.style.display = "none"
}

function loadSettings(){
    let defaultSettings = {
    darkMode: window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
    lang: window.location.pathname.startsWith('/ru') ? 'ru' : 'en'
    }
    let settings = localStorage.getItem('SETTINGS') ? JSON.parse(localStorage.getItem('SETTINGS')) : defaultSettings;
    
    inputs[0].value = settings.lang
    inputs[1].checked = settings.darkMode == 'dark'

    document.documentElement.classList.add(settings.darkMode);
    document.documentElement.classList.remove(settings.darkMode == 'light' ? 'dark' : 'light')
    
    if (settings.lang != defaultSettings.lang) {
    let newPath = settings.lang == 'ru' ? '/ru' + window.location.pathname + window.location.hash : window.location.pathname.substring(3) + window.location.hash;
    window.location.replace(window.location.origin + newPath)
    }
}
loadSettings()