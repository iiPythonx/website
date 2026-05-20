import projects from "./projects.json";
import "./projects.css";
import { useState } from "preact/hooks";

interface ProjectProps {
    id:          number;
    name:        string;
    description: string;
    end?:        number;
    aka?:        string;
    code?:       string;
    site?:       string
}

function Project({ id, name, description, aka, site }: ProjectProps) {
    const [expanded, setExpanded] = useState<boolean>(false);

    const handleExpansion = () => {
        setExpanded(!expanded);
    }

    return <div class = "project">
        <h4 className = "project-title" onClick={handleExpansion}>
            <span className = {`dark project-id ${expanded ? 'expanded' : ''}`}>{id}</span>
            {site ? <a href = {site}>{name}</a> : <span>{name}</span>}
            {aka && <span className = "dark">&#40;{aka}&#41;</span>}
            <span className = "expand-caret" style = {{ rotate: expanded ? "0deg" : "90deg" }}>&#9660;</span>
        </h4>
        {expanded && <span dangerouslySetInnerHTML = {{ __html: description }}></span> }
    </div>;
}

function ProjectListing() {
    return <div className = "project-list">
        {(projects as ProjectProps[]).sort((a, b) => b.id - a.id).map(
            (project) => <>
                <Project {...project} />
                <hr className = "dark" />
            </>
        )}
    </div>;
}

export function ProjectPage() {
    return <>
        <h2 class = "page-title">Listing</h2>
        <ProjectListing />
    </>
}