const IIPYTHON_SUBDOMAINS = [
    "cdn", "q3", "radar", "os", "covers", "pizza", "cdbar", "uniform", "pack", "remote",
    "index", "vcs", "radio", "map", "cmd", "xpp"
];

const FEATURED_PROJECTS = [
    {
        link: "https://github.com/iiPythonx/snorlax",
        name: "Snorlax",
        desc: `Self-hosted archival service for preserving YouTube videos, powered by <a href = "https://github.com/yt-dlp/yt-dlp">yt-dlp</a>.`
    },
    {
        link: "https://github.com/iiPythonx/radio",
        name: "iiPython Radio",
        desc: "Modern take on a web radio, powered by Websockets with decent client synchronization."
    },
    {
        link: "https://github.com/iiPythonx/cdbar",
        name: "cdbar",
        desc: "Frontend that takes a CD barcode and spits out release data in exchange."
    },
    {
        link: "https://github.com/iiPythonx/xpp",
        name: "xpp",
        desc: "A custom programming language, written in pure Python and intentionally limiting to encourage creativity."
    }
];

export function ProjectPage() {
    return <>
        <h2 class = "page-title">Preface</h2>
        <p>
            I've made a <b>lot</b> of projects during my time on the internet.
            Because of that, this page only covers projects that I think were big enough to warrant a mention.
            For a <b>full</b> project list, check out the <a href = "https://index.iipython.dev">iiPython Index</a>.
        </p>
        <h2 class = "page-title">Featured</h2>
        <div style = {{ display: "flex", gap: "10px", flexDirection: "column" }}>
            {FEATURED_PROJECTS.map((project) => <div>
                <h4><a href = {project.link}>{project.name}</a></h4>
                <span dangerouslySetInnerHTML = {{ __html: project.desc }}></span>
            </div>)}
        </div>
        <h2 class = "page-title">Public Services</h2>
        <div style = {{ display: "flex", gap: "10px", flexWrap: "wrap"}}>
            {IIPYTHON_SUBDOMAINS.map((subdomain) => <div style = {{ width: "200px" }}><a href = {`https://${subdomain}.iipython.dev`}>{subdomain}.iipython.dev</a></div>)}
        </div>
    </>
}