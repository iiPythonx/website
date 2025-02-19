// Copyright (c) 2025 iiPython

const content = document.getElementById("content");
const calculate_progress = () => content.scrollTop + content.clientHeight;
const redraw = () => {
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
    console.log(mutations);
    if (mutations[0].addedNodes.length && mutations[0].addedNodes[0].className === "read-progress") return;
    redraw();
})).observe(content, { childList: true });
redraw();

for (const link of document.querySelectorAll("nav > a")) {
    link.addEventListener("click", () => {
        for (const link of document.querySelectorAll("nav > a")) link.classList.remove("active");
        link.classList.add("active");
    });
}
Array.from(document.querySelectorAll("nav > a")).find(e => e.textContent.toLowerCase() === location.pathname.slice(1) || "home").classList.add("active");
