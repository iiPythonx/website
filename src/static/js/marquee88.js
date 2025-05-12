// Copyright (c) 2025 iiPython
// Marquee88 - Infinite marquee system for 88x31 buttons

(() => {

    // Configuration
    const elements = [
        {
            element: document.querySelector("#left-m88"),
            gap: 10,              // Gap between buttons, in pixels
            amount: 1,            // Pixels to move per animation frame
            direction: "left"     // Direction to move in, `left` or `right`
        }
    ];

    // Ensure positions are relative so we can use `left`
    for (const config of elements) {
        const box = config.element.querySelector("div");
        box.style.position = "relative";

        const append = config.direction === "right" ? "prepend" : "appendChild";
        const multiplier = config.direction === "right" ? -1 : 1;
        const comparison = config.direction === "right" ? (x, y) => x >= y : (x, y) => x <= y;

        // Setup animation
        let offset = 0, last = 0;
        function frame(time) {
            if (time - last >= 10) {
                const target = config.direction === "right" ? box.lastElementChild : box.firstElementChild;

                // Calculate bounding boxes
                const truth = config.element.getBoundingClientRect()[config.direction];
                const rect = target.getBoundingClientRect();
            
                // Push last button to opposite side
                if (comparison(rect[config.direction] + (rect.width * multiplier), truth)) {
                    box[append](target);
                    offset += rect.width + config.gap;
                }
            
                // Update box positioning
                box.style[config.direction] = `${offset}px`;
                offset -= config.amount;
                last = time;
            }
            requestAnimationFrame(frame);
        }
        requestAnimationFrame(frame);
    };
})();
