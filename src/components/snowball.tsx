import { useEffect, useRef } from "preact/hooks";

export default function Snowball() {
    const snowballRef = useRef<HTMLImageElement | null>(null);

    useEffect(() => {
        const snowball = snowballRef.current;
        if (!snowball) return;

        var rotation = 0;
        snowball.addEventListener("click", () => {
            snowball.classList.add("move");
            rotation += 3600;
            snowball.style.rotate = `${rotation}deg`;
        });
        snowball.addEventListener("transitionend", () => {
            snowball.classList.remove("move");
            (rotation = 0), (snowball.style.rotate = "0deg");
        });
    }, []);

    return <img src = "/snowball.avif" id = "snowball" ref = {snowballRef} />;
}