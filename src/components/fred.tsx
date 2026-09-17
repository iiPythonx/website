import { useEffect, useRef, useState } from "preact/hooks";
import fredUrl from "@/assets/images/fred.avif";

export default function Fred() {
    const fredRef = useRef<HTMLImageElement | null>(null);
    const lfacRef = useRef<HTMLDivElement | null>(null);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [videoVisible, setVideoVisible] = useState<boolean>(false);
    const [clicked, setClicked] = useState<boolean>(false);

    useEffect(() => {
        const fred = fredRef.current;
        if (!fred) return;

        fred.addEventListener("click", () => {
            if (clicked) return;
            setClicked(true);

            setTimeout(() => {
                if (!lfacRef.current) return;
                lfacRef.current.style.opacity = "1";
                setTimeout(() => {
                    if (!videoRef.current) return;
                    setVideoVisible(true)
                    videoRef.current.play();
                }, 4000);
            }, 100);
        });
    }, []);

    return <>
        <img src = {fredUrl} id = "fred" ref = {fredRef} />
        <div id = "lfac" ref = {lfacRef} style = {{ display: clicked ? "flex" : "none"}}>
            <video ref = {videoRef} loop style = {{ display: videoVisible ? "block" : "none" }}>
                <source src = "https://cdn.iipython.dev/v/lfac.mp4" type = "video/mp4" />
            </video>
        </div>
    </>;
}