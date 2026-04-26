import { Link } from "wouter";

import GitHubIcon from "../assets/icons/github.svg?react";
import DiscordIcon from "../assets/icons/discord.svg?react";
import AniListIcon from "../assets/icons/anilist.svg?react";
import SteamIcon from "../assets/icons/steam.svg?react";

const ACCOUNT_LIST = [
    { name: "GitHub",  link: "https://github.com/iiPythonx",                 user: "iiPythonx", icon: GitHubIcon },
    { name: "Discord", link: "https://discord.com/users/633185043774177280", user: "iiPython",  icon: DiscordIcon },
    { name: "AniList", link: "https://anilist.co/user/iiPython/",            user: "iiPython",  icon: AniListIcon },
    { name: "Steam",   link: "https://steamcommunity.com/id/iiPython_",      user: "iiPython_", icon: SteamIcon },
]

function AccountList() {
    return ACCOUNT_LIST.map((account) => {
        const Icon = account.icon;
        return <div style = {{ display: "flex", gap: "6px", alignItems: "center" }}>
            <Icon />
            <span style = {{ width: "70px" }}>{account.name}:</span>
            <span><a href = {account.link}>@{account.user}</a></span>
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
        <h2 class = "page-title">Accounts</h2>
        <AccountList />
    </>
}