import projects from "./projects.json";
import "./projects.css";
import { useState } from "preact/hooks";

interface LinkProps {
    type: 'git' | 'site';
    link: string;
}

interface ProjectProps {
    index: number;
    title: string;
    about: string;
    until: number | null;
    alias: string | null;
    links: LinkProps[];
}

function Project({ index, title, about, until, alias, links }: ProjectProps) {
    const [expanded, setExpanded] = useState<boolean>(false);

    const handleExpansion = () => {
        setExpanded(!expanded);
    }

    const periodStart = index.toString().slice(0, 2);
    const devPeriod = until != +periodStart ? `20${periodStart} - ${until ? `20${until}` : 'ongoing'}` : `20${until}`;

    const gitLink = links.find(link => link.type === "git")?.link ?? null;
    const siteLink = links.find(link => link.type === "site")?.link ?? null;

    return <div class = "project">
        <h4 className = "project-title" onClick={handleExpansion}>
            <span className = {`dark project-id ${expanded ? 'expanded' : ''}`}>{index}</span>
            {siteLink ? <a href = {siteLink}>{title}</a> : <span>{title}</span>}
            {alias && <span className = "dark">&#40;{alias}&#41;</span>}
            <span className = "expand-caret" style = {{ rotate: expanded ? "-90deg" : "0deg" }}>◀</span>
        </h4>
        {expanded && <>
            <span dangerouslySetInnerHTML = {{ __html: about }}></span> <br />
            <span>Source: {gitLink ? <a href = {gitLink}>available here</a> : "not available"} | Development Period: {devPeriod}</span>
        </>}
    </div>;
}

export default function ProjectListing() {
    const filterPublicServices = (new URLSearchParams(window.location.search)).get("url") === "true";

    const publicFilter = (project: ProjectProps) => {
        const siteLink = project.links.find(link => link.type === "site")?.link ?? null;
        return filterPublicServices ? siteLink !== null : true;
    }

    return <div className = "project-list">
        {(projects as ProjectProps[]).sort((a, b) => b.index - a.index).filter(publicFilter).map(
            (project) => <>
                <Project {...project} />
                <hr className = "dark" />
            </>
        )}
    </div>;
}
