import { Link } from "wouter";

export function AboutPage() {
    return <>
        <h2>Kachow!</h2>
        <p>
            I'm Benjamin: a software developer, system administrator, and cybersecurity student. <br />
            I like programming, configuring my homelab, and listening to music.
        </p>
        <br />
        <p>For ways to contact me, check out my <Link href = "/contact">contact page</Link>!</p>
    </>
}