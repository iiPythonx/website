// Copyright (c) 2025 iiPython
// Marquee88 - Infinite marquee system for 88x31 buttons

(() => {

    // Configuration
    const gap = 10;  // Gap between buttons, in pixels
    const element = document.querySelector(".m88");  // Main element you want to select

    // Ensure position is relative so we can use `left`
    const box = element.querySelector("div");
    box.style.position = "relative";

    // Setup interval
    let left = 0;
    interval = setInterval(() => {

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
        left--;
    }, 20);
})();
