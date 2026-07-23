// Kachow Webring
// Copyright (c) 2026 iiPython

// Initialization
const MEMBERS = [
    {
        url: "iipython.dev",
        name: "ben's house"
    },
    {
        url: "k4ffu.dev",
        name: "k4ffu's cave"
    }
];

const TEMPLATE = `
    <style>
        main {
            width: 200px;
            padding-top: 10px;
            padding-bottom: 5px;
            border: 1px solid var(--webring-border);
            background: var(--webring-background);

            /* Alignment */
            display: flex;
            flex-direction: column;
        }
        button {
            cursor: pointer;
            border: none;
            background: none;
        }
        #name {
            color: var(--webring-text);
        }
        #row {
            display: flex;
            justify-content: space-between;
            padding-left: 10%;
            padding-right: 10%;
        }
        #marquee {
            overflow: hidden;
            white-space: nowrap;
            box-sizing: border-box;

            & > span {
                display: inline-block;
            }
        }
        @keyframes marquee {
            0%   { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
        }
        .animate {
            display: inline-flex;
            animation: marquee 10s linear infinite;
        }
        .site-name {
            color: var(--webring-name);
        }
    </style>
    <main>
        <div id = "row">
            <button id = "button-prev">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                    <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stop-color="var(--webring-name)" />
                            <stop offset="100%" stop-color="var(--webring-text)" />
                        </linearGradient>
                    </defs>
                    <path fill="var(--webring-icon)" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
                </svg>
            </button>
            <button id = "button-random">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                    <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%" gradientUnits="userSpaceOnUse">
                            <stop offset="0%" stop-color="var(--webring-name)" />
                            <stop offset="100%" stop-color="var(--webring-text)" />
                        </linearGradient>
                    </defs>
                    <path fill="var(--webring-icon)" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"/>
                    <path fill="var(--webring-icon)" d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466"/>
                </svg>
            </button>
            <button id = "button-list">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                    <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stop-color="var(--webring-name)" />
                            <stop offset="100%" stop-color="var(--webring-text)" />
                        </linearGradient>
                    </defs>
                    <path fill="var(--webring-icon)" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m-3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2m0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2m0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/>
                </svg>
            </button>
            <button id = "button-next">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                    <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stop-color="var(--webring-name)" />
                            <stop offset="100%" stop-color="var(--webring-text)" />
                        </linearGradient>
                    </defs>
                    <path fill="var(--webring-icon)" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
                </svg>
            </button>
        </div>
        <div id = "marquee">
            <span id = "name">welcome to <span class = "site-name">ben's house</span>&nbsp;/&nbsp;</span>
        </div>
    </main>
`;

// Inject the webring template
{
    const webring = document.createElement("div");
    webring.id = "iipython-webring";

    const shadow = webring.attachShadow({ mode: "open" });

    // Find current site match
    const found = MEMBERS.filter((x) => x.url === location.hostname);
    if (!found.length) found.push({ url: "localhost", name: "development hell" });

    const current = found[0];

    // Push
    shadow.innerHTML = TEMPLATE;
    document.body.appendChild(webring);

    // Handle buttons
    shadow.getElementById("button-prev").addEventListener("click", () => {
        window.location.href = `https://${MEMBERS[MEMBERS.indexOf(current) - 1].url}`;
    });
    shadow.getElementById("button-random").addEventListener("click", () => {
        window.location.href = `https://${MEMBERS[Math.floor(Math.random() * MEMBERS.length)].url}`;
    });
    shadow.getElementById("button-list").addEventListener("click", () => {
        alert("this doesn't work yet lmao");
    })
    shadow.getElementById("button-next").addEventListener("click", () => {
        window.location.href = `https://${MEMBERS[MEMBERS.indexOf(current) + 1].url}`;
    });

    shadow.querySelector(".site-name").innerText = current.name;

    // Setup marquee
    const name = shadow.getElementById("name");
    const marquee = name.parentElement;
    
    const wrapper = document.createElement("div");
    wrapper.className = "animate";
    
    const duplicate = name.cloneNode(true);
    wrapper.appendChild(name);
    wrapper.appendChild(duplicate);
    marquee.appendChild(wrapper);
}

