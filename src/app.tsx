import { useEffect, useRef, useState } from "preact/hooks";
import { Link, Route, Switch } from "wouter";

import { AboutPage } from "./pages/about";
import { ProjectPage } from "./pages/projects";
import { ContactPage } from "./pages/contact";

import "./assets/css/index.css";
import "./assets/oneko.js";

const AVAILABLE_NAMES = [
    "Benjamin O'Brien",
    "iiPython"

    // Not sure if I want other variants here rn
    // ...
]

export function App() {
    const [displayNameIndex, setDisplayNameIndex] = useState<number>(0);
    const marqueeRef = useRef<HTMLDivElement | null>(null);
    const snowballRef = useRef<HTMLImageElement | null>(null);

    useEffect(() => {
        if (!marqueeRef.current) return;

        const box = marqueeRef.current.querySelector("div");
        if (!box) return;

        box.style.position = "relative";

        // Setup animation
        let offset = 0, last = 0;
        function frame(time: number) {
            if (time - last >= 10 && marqueeRef.current) {
                const target = box?.firstElementChild;
                if (!target || !box) return;

                // Calculate bounding boxes
                const truth = marqueeRef.current.getBoundingClientRect().left;
                const rect = target.getBoundingClientRect();
            
                // Push last button to opposite side
                if (rect.left + rect.width <= truth) {
                    box?.appendChild(target);
                    offset += rect.width + 10;
                }
            
                // Update box positioning
                box.style.left = `${offset}px`;
                offset -= 1;
                last = time;
            }
            requestAnimationFrame(frame);
        }
        requestAnimationFrame(frame);
    }, [marqueeRef.current]);

    useEffect(() => {
        const snowball = snowballRef.current;
        if (!snowball) return;

        var rotation = 0;
        snowball.addEventListener("click", () => {
            snowball.classList.add("move");
            rotation += 3600;
            snowball.style.rotate = `${rotation}deg`;
        });
        snowball.addEventListener("transitionend", () => {
            snowball.classList.remove("move");
            (rotation = 0), (snowball.style.rotate = "0deg");
        });
    }, []);

    return <>
        <header>
            <h2 onClick = {() => {
                let newIndex = displayNameIndex + 1;
                setDisplayNameIndex(newIndex === AVAILABLE_NAMES.length ? 0 : newIndex);
            }}>
                <span>{AVAILABLE_NAMES[displayNameIndex]}</span>
                <span class = "caret">_</span>
            </h2>
            <Link className = {(a) => a ? "link-active" : "link-invert"} href = "/about">About</Link>
            <Link className = {(a) => a ? "link-active" : "link-invert"} href = "/projects">Projects</Link>
            <Link className = {(a) => a ? "link-active" : "link-invert"} href = "/contact">Contact</Link>
        </header>
        <hr />
        <section id = "content">
            <Switch>
                <Route path = "/about" component = {AboutPage} />
                <Route path = "/projects" component = {ProjectPage} />
                <Route path = "/contact" component = {ContactPage} />
                <Route><AboutPage /></Route>
            </Switch>
        </section>
        <div class = "m88" ref = {marqueeRef}>
            <div>
                <img loading = "lazy" src = "/88x31/chrome_is_evil.avif" />
                <img loading = "lazy" src = "/88x31/coke.avif" />
                <img loading = "lazy" src = "/88x31/f_ckfb.avif" />
                <img loading = "lazy" src = "/88x31/fftake.avif" />
                <img loading = "lazy" src = "/88x31/firefox.avif" />
                <img loading = "lazy" src = "/88x31/gothtml.avif" />
                <img loading = "lazy" src = "/88x31/internetprivacy.gif" />
                <img loading = "lazy" src = "/88x31/koolaid.avif" />
                <img loading = "lazy" src = "/88x31/madeon_linux.gif" />
                <img loading = "lazy" src = "/88x31/roly-saynotoweb3.gif" />
                <img loading = "lazy" src = "/88x31/stand_up_to_google.avif" />
                <img loading = "lazy" src = "/88x31/thunderbird.avif" />
                <img loading = "lazy" src = "/88x31/ubo.avif" />
                <img loading = "lazy" src = "/88x31/vscodium100.avif" />
            </div>
        </div>
        <img src = "/snowball.avif" id = "snowball" ref = {snowballRef} />
    </>
}
