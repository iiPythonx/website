import type { ComponentChildren } from "preact";

type SectionProps = {
    title:   string;
    content: ComponentChildren;
}

export function Section({ title, content }: SectionProps) {
    return <section>
        <h2 class = "page-title">{title}</h2>
        {content}
    </section>;
}

export function Page({ sections }: { sections: SectionProps[] }) {
    return sections.map(section => <Section {...section} />);
}
