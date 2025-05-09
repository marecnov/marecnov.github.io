import {resetGallery,goToItem} from "./gallery-navigation.js";
import addZoomAndPanFunctionality from "./gallery-zoomAndPan.js"
let srcs = []
let startingUrl = ""
export function changeSrcs (arr,url = ""){
    startingUrl = url
    srcs = arr
    loadGallery(srcs)
}
function createGalleryItem(src,isVideo=false){
    var el = document.createElement("div")
    el.classList.add("gallery-item")
    if(isVideo == true){
        var video = document.createElement("video");
        video.innerText = "Your browser does not support this video format.";
        // revork thumb nail, cause it size is 80x80 and we need bigger
        // video.poster = "thumb/" + src.picture;
        video.controls = true;
        // video.preload = "metadata";

        var source = document.createElement("source");
        source.src = startingUrl + "media/" + src.media;
        // source.type = "video/x-matroska"; // MIME type for .mkv
        source.type = "video/mp4"; 
        video.appendChild(source);
    
        el.appendChild(video);  
    }
    else{
        var img = document.createElement("img")
        img.src = startingUrl + "media/" +  src
        el.appendChild(img)
        addZoomAndPanFunctionality(el)
    }
    document.querySelector('.nav-arrow.right').before(el)
}
function createThumbnail(src,isVideo = false,oid){
    if(oid <=2){
        // add preview for video
        if(isVideo == true){

        }
        else{
            if( oid == 0) document.querySelector(".media-item.main").src = startingUrl + "media/" + src
            else{
                document.querySelector(`.media-item.shadow${oid}`).style.backgroundImage = `url("${startingUrl}media/${src}")`
                document.querySelector(`.media-item.shadow${oid}`).style.backgroundSize = "cover"
                document.querySelector(`.media-item.shadow${oid}`).style.backgroundPosition = "center"
                document.querySelector(`.media-item.shadow${oid}`).style.backgroundRepeat = "no-repeat"
            }
        }
    }
    if(isVideo == true){
        let video = document.createElement("div")
        video.classList.add("thumbnail")
        video.classList.add("video")
        video.addEventListener("click",()=>goToItem(oid))
        var img = document.createElement("img")
        img.src = startingUrl + "thumb/" + src.thumb
        var span = document.createElement("span")
        span.innerText = "▶"
        span.classList.add("play-icon")
        video.appendChild(img);
        video.appendChild(span);
        document.querySelector(".thumbnails").appendChild(video)

    }
    else{
        var img = document.createElement("img")
        img.classList.add("thumbnail")
        img.src = startingUrl + "thumb/" + src
        img.addEventListener("click",()=>goToItem(oid))
        document.querySelector(".thumbnails").appendChild(img)
    }

}
function loadGallery(srcs){
    for(let i = 0; i < srcs.length;i++){
        createGalleryItem(srcs[i],srcs[i]?.isVideo)
        createThumbnail(srcs[i],srcs[i]?.isVideo,i)
    }
    resetGallery()
}

loadGallery(srcs)