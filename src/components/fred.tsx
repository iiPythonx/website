import { useRef, useState } from "preact/hooks";
import fredUrl from "@/assets/images/fred.avif";

export default function Fred() {
    const lfacRef = useRef<HTMLDivElement | null>(null);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [clicked, setClicked] = useState<boolean>(false);

    return <>
        <img
            src = {fredUrl}
            id = "fred"
            onClick = {() => {
                if (clicked) return;
                setClicked(true);

                setTimeout(() => {
                    if (!lfacRef.current) return;
                    lfacRef.current.style.opacity = "1";
                    setTimeout(() => {
                        if (!videoRef.current) return;
                        videoRef.current.style.display = "block";
                        videoRef.current.play();
                    }, 4000);
                }, 100);
            }}
        />
        <div id = "lfac" ref = {lfacRef} style = {{ display: clicked ? "flex" : "none"}}>
            <video ref = {videoRef} loop style = {{ display: "none" }}>
                <source src = "https://cdn.iipython.dev/v/lfac.mp4" type = "video/mp4" />
            </video>
        </div>
    </>;
}