{const thumbnailsContainer = document.querySelector('.thumbnails');
// Thumbnail drag-to-scroll
let isDraggingThumbs = false, startX, scrollLeft;
thumbnailsContainer.addEventListener('mousedown', (e) => {
isDraggingThumbs = true;
startX = e.pageX - thumbnailsContainer.offsetLeft;
scrollLeft = thumbnailsContainer.scrollLeft;
thumbnailsContainer.style.cursor = 'grabbing';
e.preventDefault();
});

thumbnailsContainer.addEventListener('mousemove', (e) => {
if (!isDraggingThumbs) return;
e.preventDefault();
const x = e.pageX - thumbnailsContainer.offsetLeft;
const walk = (x - startX) * 2;
thumbnailsContainer.scrollLeft = scrollLeft - walk;
});

thumbnailsContainer.addEventListener('mouseup', () => {
isDraggingThumbs = false;
thumbnailsContainer.style.cursor = 'default';
});

thumbnailsContainer.addEventListener('mouseleave', () => {
isDraggingThumbs = false;
thumbnailsContainer.style.cursor = 'default';
});

thumbnailsContainer.addEventListener('touchstart', (e) => {
startX = e.touches[0].pageX - thumbnailsContainer.offsetLeft;
scrollLeft = thumbnailsContainer.scrollLeft;
e.preventDefault();
});

thumbnailsContainer.addEventListener('touchmove', (e) => {
const x = e.touches[0].pageX - thumbnailsContainer.offsetLeft;
const walk = (x - startX) * 2;
thumbnailsContainer.scrollLeft = scrollLeft - walk;
e.preventDefault();
});
}