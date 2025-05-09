let currentIndex = 0;
let items = document.querySelectorAll('.gallery-item');
let thumbnails = document.querySelectorAll('.thumbnails .thumbnail');
const overlay = document.querySelector('.gallery-overlay');

export function resetGallery(){
    items = document.querySelectorAll(".gallery-item");
    thumbnails = document.querySelectorAll('.thumbnails .thumbnail');
}

function openGallery(index) {
    // used only once in preview class
    currentIndex = index;
    overlay.style.display = 'block';
    updateGallery();
}
document.querySelector(".media-preview").addEventListener('click',()=>openGallery(0))


function closeGallery() {
    overlay.style.display = 'none';
    items.forEach(item => {
        if (item.querySelector('video')) {
            item.querySelector('video').pause();
        }
        item.classList.remove('zoomed');
        const img = item.querySelector('img');
        if (img) {
            img.style.transform = 'scale(1) translate(0px, 0px)';
            img.style.cursor = 'zoom-in';
        }
    });
}
document.querySelector("span.close-btn").addEventListener("click",()=>closeGallery())

function navigate(direction) {
    currentIndex = (currentIndex + direction + items.length) % items.length;
    updateGallery();
}
document.querySelector(".nav-arrow.left").addEventListener("click",()=>navigate(-1))
document.querySelector(".nav-arrow.right").addEventListener("click",()=>navigate(1))

export function goToItem(index) {
    currentIndex = index;
    updateGallery();
}
function updateGallery() {
    items.forEach((item, index) => {
        item.classList.toggle('active', index === currentIndex);
        if (item.querySelector('video') && index !== currentIndex) {
            item.querySelector('video').pause();
        }
        item.classList.remove('zoomed');
        const img = item.querySelector('img');
        if (img) {
            img.style.transform = 'scale(1) translate(0px, 0px)';
            img.style.cursor = 'zoom-in';
        }
    });

    thumbnails.forEach((thumb, index) => {
        thumb.classList.toggle('active', index === currentIndex);
    });

    const activeThumb = thumbnails[currentIndex];
    if (activeThumb) {
        activeThumb.scrollIntoView({ behavior: 'smooth', inline: 'center' });
    }
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    e.preventDefault();
    if (overlay.style.display === 'block' ) {
        if (e.key === 'ArrowLeft') navigate(-1);
        if (e.key === 'ArrowRight') navigate(1);
        if (e.key === 'Escape') closeGallery();
    }
});
