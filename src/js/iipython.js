// Copyright (c) 2024 iiPython

// Handle link connection
const pages = ["/", "/music", "/projects"];
const length = location.origin.length;
const cache = {};
for (const link of document.getElementsByTagName("a")) {
    const relative = link.href.slice(length);
    if (!pages.includes(relative)) continue;
    const load_page = async () => {
        if (cache[relative]) return;
        cache[relative] = await (await fetch(`/page${relative === '/' ? '/index' : relative}`)).text();
        removeEventListener("mouseover", load_page);
    };
    link.addEventListener("mouseover", load_page);
    link.addEventListener("click", (e) => {
        e.preventDefault();

        // Set title
        const title = relative.slice(1);
        document.title = `iiPython${title && (' / ' + title[0].toUpperCase() + title.slice(1))}`;

        // Update active page
        document.getElementsByClassName("wrapper")[0].innerHTML = cache[relative];
    });
}
