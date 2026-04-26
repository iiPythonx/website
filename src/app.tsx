import { useState } from "preact/hooks";
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
            <a href = "/about">About</a>
            <a href = "/projects">Projects</a>
            <a href = "/contact">Contact</a>
        </header>
        <hr />
        <section id = "content"><span>Hello, world!</span></section>
    </>
}
