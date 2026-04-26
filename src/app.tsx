import { useState } from "preact/hooks";
import { Link, Route, Switch } from "wouter";

import { AboutPage } from "./pages/about";
import { ProjectPage } from "./pages/projects";
import { ContactPage } from "./pages/contact";

import "./assets/css/index.css";

const AVAILABLE_NAMES = [
    "Benjamin O'Brien",
    "iiPython"

    // Not sure if I want other variants here rn
    // ...
]

export function App() {
    const [displayNameIndex, setDisplayNameIndex] = useState<number>(0);

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
    </>
}
