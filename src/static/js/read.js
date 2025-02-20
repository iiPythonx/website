// Copyright (c) 2025 iiPython

const content = document.getElementById("content");
const calculate_progress = () => content.scrollTop + content.clientHeight;
const redraw = () => {
    if (calculate_progress() >= content.scrollHeight) return;
    const reading_progress = document.createElement("span");
    reading_progress.classList.add("read-progress")
    reading_progress.innerText = `${Math.round((calculate_progress() / content.scrollHeight) * 100)}%`;
    content.appendChild(reading_progress);
};
content.addEventListener("scroll", () => {
    const progress = content.querySelector(".read-progress");
    if (!progress) return;
    progress.innerText = `${Math.round((calculate_progress() / content.scrollHeight) * 100)}%`;
});
(new MutationObserver((mutations) => {
    if (mutations[0].addedNodes.length && mutations[0].addedNodes[0].className === "read-progress") return;
    redraw();
})).observe(content, { childList: true });
setTimeout(redraw, 1);
