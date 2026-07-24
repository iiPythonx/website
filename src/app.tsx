import { render } from "preact";
import { useState } from "preact/hooks";
import { Link, Route, Switch, useLocation } from "wouter";
import { lazy, Suspense } from "preact/compat";

import { AboutPage } from "@/pages/about";
import { ContactPage } from "@/pages/contact";

import fredImage from "@/assets/images/fred.avif";
import flockImage from "@/assets/images/flock.avif";

import "@/assets/index.css";
import "@/assets/oneko.js";
import Snowball from "@/components/snowball.js";
import Marquee from "@/components/marquee.js";

const AVAILABLE_NAMES = [
    "Benjamin O'Brien",
    "iiPython"
]

const ProjectPage = lazy(() => import("./pages/projects/index.js"));

function App() {
    const [displayNameIndex, setDisplayNameIndex] = useState<number>(0);
    const [location,] = useLocation();

    return <>
        <header>
            <h2 onClick = {() => {
                let newIndex = displayNameIndex + 1;
                setDisplayNameIndex(newIndex === AVAILABLE_NAMES.length ? 0 : newIndex);
            }}>
                <span>{AVAILABLE_NAMES[displayNameIndex]}</span>
                <span class = "caret">_</span>
            </h2>
            <Link className = {(a) => a || location === "/" ? "link-active" : "link-invert"} href = "/about">About</Link>
            <Link className = {(a) => a ? "link-active" : "link-invert"} href = "/projects">Projects</Link>
            <Link className = {(a) => a ? "link-active" : "link-invert"} href = "/contact">Contact</Link>
        </header>
        <hr />
        <section id = "content">
            <Switch>
                <Route path = "/about" component = {AboutPage} />
                <Route path = "/projects">
                    {() => <Suspense fallback={null}><ProjectPage /></Suspense>}
                </Route>
                <Route path = "/contact" component = {ContactPage} />
                <Route><AboutPage /></Route>
            </Switch>
        </section>
        <Marquee />
        <Snowball />
        <a href = "https://deflock.org" id = "flock">
            <img src = {flockImage} />
        </a>
        <img src = {fredImage} id = "fred" />
    </>
}

render(<App />, document.querySelector("main")!);
