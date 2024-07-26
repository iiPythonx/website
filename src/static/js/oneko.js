// Handle oneko.js
!(function e() {
    let t = document.createElement("div"),
        l = 32,
        n = 32,
        a = 0,
        i = 0,
        r = !0 === window.matchMedia("(prefers-reduced-motion: reduce)") || !0 === window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (r) return;
    let c = 0,
        s = 0,
        o = null,
        $ = 0,
        d = {
            idle: [[-3, -3]],
            alert: [[-7, -3]],
            scratchSelf: [
                [-5, 0],
                [-6, 0],
                [-7, 0],
            ],
            scratchWallN: [
                [0, 0],
                [0, -1],
            ],
            scratchWallS: [
                [-7, -1],
                [-6, -2],
            ],
            scratchWallE: [
                [-2, -2],
                [-2, -3],
            ],
            scratchWallW: [
                [-4, 0],
                [-4, -1],
            ],
            tired: [[-3, -2]],
            sleeping: [
                [-2, 0],
                [-2, -1],
            ],
            N: [
                [-1, -2],
                [-1, -3],
            ],
            NE: [
                [0, -2],
                [0, -3],
            ],
            E: [
                [-3, 0],
                [-3, -1],
            ],
            SE: [
                [-5, -1],
                [-5, -2],
            ],
            S: [
                [-6, -3],
                [-7, -2],
            ],
            SW: [
                [-5, -3],
                [-6, -1],
            ],
            W: [
                [-4, -2],
                [-4, -3],
            ],
            NW: [
                [-1, 0],
                [-1, -1],
            ],
        },
        h;
    function _(e) {
        t.isConnected &&
            (h || (h = e),
            e - h > 100 &&
                ((h = e),
                (function e() {
                    c += 1;
                    let r = l - a,
                        d = n - i,
                        h = Math.sqrt(r ** 2 + d ** 2);
                    if (h < 10 || h < 48) {
                        !(function e() {
                            if ((s += 1) > 10 && 0 == Math.floor(200 * Math.random()) && null == o) {
                                let t = ["sleeping", "scratchSelf"];
                                l < 32 && t.push("scratchWallW"),
                                    n < 32 && t.push("scratchWallN"),
                                    l > window.innerWidth - 32 && t.push("scratchWallE"),
                                    n > window.innerHeight - 32 && t.push("scratchWallS"),
                                    (o = t[Math.floor(Math.random() * t.length)]);
                            }
                            switch (o) {
                                case "sleeping":
                                    if ($ < 8) {
                                        u("tired", 0);
                                        break;
                                    }
                                    u("sleeping", Math.floor($ / 4)), $ > 192 && f();
                                    break;
                                case "scratchWallN":
                                case "scratchWallS":
                                case "scratchWallE":
                                case "scratchWallW":
                                case "scratchSelf":
                                    u(o, $), $ > 9 && f();
                                    break;
                                default:
                                    u("idle", 0);
                                    return;
                            }
                            $ += 1;
                        })();
                        return;
                    }
                    if (((o = null), ($ = 0), s > 1)) {
                        u("alert", 0), (s = Math.min(s, 7)), (s -= 1);
                        return;
                    }
                    let _;
                    (_ = d / h > 0.5 ? "N" : ""),
                        (_ += d / h < -0.5 ? "S" : ""),
                        (_ += r / h > 0.5 ? "W" : ""),
                        u((_ += r / h < -0.5 ? "E" : ""), c),
                        (l -= (r / h) * 10),
                        (n -= (d / h) * 10),
                        (l = Math.min(Math.max(16, l), window.innerWidth - 16)),
                        (n = Math.min(Math.max(16, n), window.innerHeight - 16)),
                        (t.style.left = `${l - 16}px`),
                        (t.style.top = `${n - 16}px`);
                })()),
            window.requestAnimationFrame(_));
    }
    function u(e, l) {
        let n = d[e][l % d[e].length];
        t.style.backgroundPosition = `${32 * n[0]}px ${32 * n[1]}px`;
    }
    function f() {
        (o = null), ($ = 0);
    }
    (t.id = "oneko"),
        (t.ariaHidden = !0),
        (t.style.width = "32px"),
        (t.style.height = "32px"),
        (t.style.position = "fixed"),
        (t.style.pointerEvents = "none"),
        (t.style.backgroundImage = "url('/assets/oneko.webp')"),
        (t.style.imageRendering = "pixelated"),
        (t.style.left = `${l - 16}px`),
        (t.style.top = `${n - 16}px`),
        (t.style.zIndex = Number.MAX_VALUE),
        document.body.appendChild(t),
        document.addEventListener("mousemove", function (e) {
            (a = e.clientX), (i = e.clientY);
        }),
        window.requestAnimationFrame(_);
})();

// Handle snowball
const bear = document.getElementById("snowball");
var rotation = 0;
bear.addEventListener("click", () => {
    bear.classList.add("move");
    rotation += 3600;
    bear.style.rotate = `${rotation}deg`;
});
bear.addEventListener("transitionend", () => {
    bear.classList.remove("move");
    (rotation = 0), (bear.style.rotate = "0deg");
});

// Clickable Oneko @ DmmD 2024
(function () {
    // Defines oneko
    const oneko = document.getElementById("oneko");

    // Creates audio
    const onekoSound = new Audio("/assets/cat.mp3");

    // Reverts pointer events
    oneko.style.cursor = "pointer";
    oneko.style.pointerEvents = "auto";

    // Disables oneko after hover
    let onekoTimer = null;
    oneko.onmouseenter = () => onekoEnable();
    oneko.onmouseleave = () => onekoDisable();

    // Meows on click
    oneko.onclick = () => {
        onekoMeow();
        onekoDisable();
        onekoEnable();
    }

    // Defines Oneko helpers
    function onekoEnable() {
        if(onekoTimer !== null) return;
        onekoTimer = setInterval(() => {
            oneko.style.pointerEvents = "none";
        }, 5000);
    }

    function onekoDisable() {
        if(onekoTimer === null) return;
        clearInterval(onekoTimer);
        onekoTimer = null;
    }

    function onekoMeow() {
        onekoSound.currentTime = 0;
        onekoSound.play();
    }
})();
