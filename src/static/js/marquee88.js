// Copyright (c) 2025 iiPython
// Marquee88 - Infinite marquee system for 88x31 buttons

(() => {

    // Configuration
    const gap = 10;  // Gap between buttons, in pixels
    const amount = 1;  // Pixels to move per animation frame
    const element = document.querySelector(".m88");  // Main element you want to select

    // Ensure position is relative so we can use `left`
    const box = element.querySelector("div");
    box.style.position = "relative";

    // Setup animation
    let left = 0, last = 0;
    function frame(time) {
        if (time - last >= 10) {

            // Calculate bounding boxes
            const truth = element.getBoundingClientRect().left;
            const rect = box.children[0].getBoundingClientRect();
        
            // Push left button to right side
            if ((rect.left + rect.width) <= truth) {
                box.appendChild(box.children[0]);
                left += rect.width + gap;
            }
        
            // Update box positioning
            box.style.left = `${left}px`;
            left -= amount;
            last = time;
        }
        requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
})();
