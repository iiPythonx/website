import type GitHubIcon from "@/assets/icons/github.svg?react";

type Item = {
    name:  string;
    link:  string;
    text:  string;
    icon?: typeof GitHubIcon | null;
}

export function ItemMapping({ itemList, width }: { itemList: Item[], width?: string }) {
    return itemList.map((item) => {
        const Icon = item.icon;
        return <div style = {{ display: "flex", gap: "6px", alignItems: "center" }}>
            {Icon && <Icon />}
            <span style = {{ width: width || "70px" }}>{item.name}:</span>
            <span><a href = {item.link}>{item.text}</a></span>
        </div>
    });
}
