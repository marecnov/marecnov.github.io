export default function addZoomAndPanFunctionality(item){
    const img = item.querySelector('img');
    if (img) {
        let scale = 1, panX = 0, panY = 0;

        // Calculate zoom point
        const getZoomPoint = (e, rect) => {
            if (e.touches && e.touches.length >= 2) {
                const touch1 = e.touches[0];
                const touch2 = e.touches[1];
                return {
                    x: ((touch1.clientX + touch2.clientX) / 2 - rect.left) / rect.width,
                    y: ((touch1.clientY + touch2.clientY) / 2 - rect.top) / rect.height
                };
            }
            return {
                x: (e.clientX - rect.left) / rect.width,
                y: (e.clientY - rect.top) / rect.height
            };
        };

        // Double-click to zoom
        img.addEventListener('dblclick', (e) => {
            const rect = img.getBoundingClientRect();
            const zoomPoint = getZoomPoint(e, rect);
            item.classList.toggle('zoomed');
            scale = item.classList.contains('zoomed') ? 2 : 1;
            if (scale === 1) {
                panX = 0;
                panY = 0;
            } else {
                panX = (rect.width * (0.5 - zoomPoint.x)) / scale;
                panY = (rect.height * (0.5 - zoomPoint.y)) / scale;
            }
            img.style.transform = `scale(${scale}) translate(${panX}px, ${panY}px)`;
            img.style.cursor = scale > 1 ? 'move' : 'zoom-in';
            e.preventDefault();
        });

        // Mouse wheel zoom
        img.addEventListener('wheel', (e) => {
            e.preventDefault();
            const rect = img.getBoundingClientRect();
            const zoomPoint = getZoomPoint(e, rect);
            const prevScale = scale;
            scale += e.deltaY * -0.01;
            scale = Math.min(Math.max(1, scale), 4);
            if (scale === 1) {
                panX = 0;
                panY = 0;
                item.classList.remove('zoomed');
            } else {
                item.classList.add('zoomed');
                panX = panX * (prevScale / scale) + (rect.width * (0.5 - zoomPoint.x)) * (1 / scale - 1 / prevScale);
                panY = panY * (prevScale / scale) + (rect.height * (0.5 - zoomPoint.y)) * (1 / scale - 1 / prevScale);
            }
            img.style.transform = `scale(${scale}) translate(${panX}px, ${panY}px)`;
            img.style.cursor = scale > 1 ? 'move' : 'zoom-in';
        });

        // Panning
        let isPanning = false, startPanX, startPanY;
        img.addEventListener('mousedown', (e) => {
            if (scale > 1) {
                isPanning = true;
                startPanX = e.clientX - panX;
                startPanY = e.clientY - panY;
                img.style.cursor = 'grabbing';
            }
            e.preventDefault();
        });

        img.addEventListener('mousemove', (e) => {
            if (isPanning) {
                panX = e.clientX - startPanX;
                panY = e.clientY - startPanY;
                img.style.transform = `scale(${scale}) translate(${panX}px, ${panY}px)`;
            }
            e.preventDefault();
        });

        img.addEventListener('mouseup', () => {
            isPanning = false;
            img.style.cursor = scale > 1 ? 'move' : 'zoom-in';
        });

        img.addEventListener('mouseleave', () => {
            isPanning = false;
            img.style.cursor = scale > 1 ? 'move' : 'zoom-in';
        });

        // Pinch-to-zoom and touch panning
        let lastDistance = 0;
        img.addEventListener('touchstart', (e) => {
            if (e.touches.length === 2) {
                const touch1 = e.touches[0];
                const touch2 = e.touches[1];
                lastDistance = Math.hypot(touch1.pageX - touch2.pageX, touch1.pageY - touch2.pageY);
                e.preventDefault();
            } else if (e.touches.length === 1 && scale > 1) {
                startPanX = e.touches[0].clientX - panX;
                startPanY = e.touches[0].clientY - panY;
                e.preventDefault();
            }
        });

        img.addEventListener('touchmove', (e) => {
            if (e.touches.length === 2) {
                const rect = img.getBoundingClientRect();
                const zoomPoint = getZoomPoint(e, rect);
                const prevScale = scale;
                const touch1 = e.touches[0];
                const touch2 = e.touches[1];
                const distance = Math.hypot(touch1.pageX - touch2.pageX, touch1.pageY - touch2.pageY);
                scale += (distance - lastDistance) * 0.005;
                scale = Math.min(Math.max(1, scale), 4);
                lastDistance = distance;
                if (scale === 1) {
                    panX = 0;
                    panY = 0;
                    item.classList.remove('zoomed');
                } else {
                    item.classList.add('zoomed');
                    panX = panX * (prevScale / scale) + (rect.width * (0.5 - zoomPoint.x)) * (1 / scale - 1 / prevScale);
                    panY = panY * (prevScale / scale) + (rect.height * (0.5 - zoomPoint.y)) * (1 / scale - 1 / prevScale);
                }
                img.style.transform = `scale(${scale}) translate(${panX}px, ${panY}px)`;
                img.style.cursor = scale > 1 ? 'move' : 'zoom-in';
                e.preventDefault();
            } else if (e.touches.length === 1 && scale > 1) {
                panX = e.touches[0].clientX - startPanX;
                panY = e.touches[0].clientY - startPanY;
                img.style.transform = `scale(${scale}) translate(${panX}px, ${panY}px)`;
                e.preventDefault();
            }
        });
    }
}