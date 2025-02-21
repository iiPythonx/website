// Copyright (c) 2025 iiPython

(() => {

    // Process links
    Array.from(document.querySelectorAll("nav > a")).find(e => e.textContent.toLowerCase() === (location.pathname.slice(1) || "home")).classList.add("active");

    // Handle name changing
    const names = ["Benjamin O'Brien", "iiPython", "iiPythonx", "iiPython_", "BenjaminGotBanned"];
    let index = 0;
    document.querySelector("header > h2").addEventListener("click", (e) => {
        index++;
        if (index > names.length - 1) index = 0;
        e.currentTarget.innerText = names[index];
    });

    // Handle reading
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

    // Handle SPA
    const pages = ["/", "/about", "/music", "/projects", "/archives", "/anime"];
    const length = location.origin.length;
    const cache = {};
    const replace = document.querySelector("#content");
    function setup_links(element) {
        for (const link of element.getElementsByTagName("a")) {
            const relative = link.href.slice(length);
            if (!pages.includes(relative)) continue;
            link.addEventListener("click", async (e) => {
                e.preventDefault();
                replace.innerHTML = `<div style = "height: 100%; display: flex; align-items: center; justify-content: center;"><div class = "lds-dual-ring"></div></div>`;

                // Handle color changing
                for (const link of document.querySelectorAll("nav > a")) link.classList.remove("active");
                link.classList.add("active");

                // Fetch page from backend
                if (!cache[relative]) cache[relative] = await (await fetch(`/pages${relative === '/' ? '/index' : relative}`)).text();

                // Process document title
                const title = relative.slice(1);
                document.title = `iiPython${title && (' / ' + title[0].toUpperCase() + title.slice(1))}`;

                // Start replacing content
                replace.innerHTML = "";
                replace.append(document.createRange().createContextualFragment(cache[relative]));
                history.pushState(null, document.title, relative);

                // Catch new links
                setup_links(replace);
            });
        }
    }
    setup_links(document);
})();
