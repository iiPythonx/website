import { Link } from "wouter";

import GitHubIcon from "../assets/icons/github.svg?react";
import DiscordIcon from "../assets/icons/discord.svg?react";
import AniListIcon from "../assets/icons/anilist.svg?react";
import SteamIcon from "../assets/icons/steam.svg?react";

type Item = {
    name:  string;
    link:  string;
    text:  string;
    icon?: typeof GitHubIcon | null;
}

const ACCOUNT_LIST = [
    { name: "GitHub",  link: "https://github.com/iiPythonx",                 text: "@iiPythonx", icon: GitHubIcon },
    { name: "Discord", link: "https://discord.com/users/633185043774177280", text: "@iiPython",  icon: DiscordIcon },
    { name: "AniList", link: "https://anilist.co/user/iiPython/",            text: "@iiPython",  icon: AniListIcon },
    { name: "Steam",   link: "https://steamcommunity.com/id/iiPython_",      text: "@iiPython_", icon: SteamIcon },
]

function ItemMapping({ itemList }: { itemList: Item[] }) {
    return itemList.map((item) => {
        const Icon = item.icon;
        return <div style = {{ display: "flex", gap: "6px", alignItems: "center" }}>
            {item.icon && <Icon />}
            <span style = {{ width: "70px" }}>{item.name}:</span>
            <span><a href = {item.link}>{item.text}</a></span>
        </div>
    });
}

export function AboutPage() {
    return <>
        <h2 class = "page-title">Kachow!</h2>
        <p>
            I'm Benjamin: a software developer, system administrator, and cybersecurity student. <br />
            I like programming, configuring my homelab, and listening to music.
        </p>
        <br />
        <p>
            The iiPython username was inspired by <a href = "https://en.wikipedia.org/wiki/Pythonidae">Pythons</a>, not the programming language.
            Although I do have around 12 years of experience with <a href = "https://python.org">Python</a> so you might as well assume they're correlated somehow.
        </p>
        <br />
        <p>For ways to contact me, check out my <Link href = "/contact">contact page</Link>!</p>
        <br />
        <div className = "inline-columns">
            <section>
                <h2 class = "page-title">Accounts</h2>
                <hr />
                <ItemMapping itemList = {ACCOUNT_LIST} />
            </section>
            <section>
                <h2 class = "page-title">Frens!</h2>
                <hr />
                <ItemMapping itemList = {[
                    { name: "DmmD", link: "https://dmmdgm.dev", text: "dmmdgm.dev" },
                    { name: "Ernesto", link: "https://k4ffu.dev", text: "k4ffu.dev" },
                    { name: "Pyxfluff", link: "https://pyxfluff.dev", text: "pyxfluff.dev" },
                ]} />
                <span>... kachow?</span>
            </section>
            <section>
                <h2 class = "page-title">Services</h2>
                <hr />
                <a href = "https://covers.iipython.dev">Pizza</a>
                <a href = "https://index.iipython.dev">Project Index</a>
                <a href = "https://radar.iipython.dev">NOAA Weather Radar</a>
                <a href = "https://radio.iipython.dev">iiPython Radio</a>
                <a href = "https://cmd.iipython.dev">iiPython CMD&trade;</a>
                <Link href = "/projects">(view all)</Link>
            </section>
        </div>
    </>
}