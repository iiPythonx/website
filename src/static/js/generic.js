// Copyright (c) 2025 iiPython

for (const link of document.querySelectorAll("nav > a")) {
    link.addEventListener("click", () => {
        for (const link of document.querySelectorAll("nav > a")) link.classList.remove("active");
        link.classList.add("active");
    });
}
Array.from(document.querySelectorAll("nav > a")).find(e => e.textContent.toLowerCase() === (location.pathname.slice(1) || "home")).classList.add("active");

const names = ["Benjamin O'Brien", "iiPython", "iiPythonx", "iiPython_", "BenjaminGotBanned"];
let index = 0;
document.querySelector("header > h2").addEventListener("click", (e) => {
    index++;
    if (index > names.length - 1) index = 0;
    e.currentTarget.innerText = names[index];
});
