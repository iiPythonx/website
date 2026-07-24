import { useEffect, useRef } from "preact/hooks";

export default function Marquee() {
    const marqueeRef = useRef<HTMLDivElement | null>(null);
    
    useEffect(() => {
        if (!marqueeRef.current) return;

        const box = marqueeRef.current.querySelector("div");
        if (!box) return;

        box.style.position = "relative";

        // Setup animation
        let offset = 0, last = 0;
        function frame(time: number) {
            if (time - last >= 10 && marqueeRef.current) {
                const target = box?.firstElementChild;
                if (!target || !box) return;

                // Calculate bounding boxes
                const truth = marqueeRef.current.getBoundingClientRect().left;
                const rect = target.getBoundingClientRect();
            
                // Push last button to opposite side
                if (rect.left + rect.width <= truth) {
                    box?.appendChild(target);
                    offset += rect.width + 10;
                }
            
                // Update box positioning
                box.style.left = `${offset}px`;
                offset -= 1;
                last = time;
            }
            requestAnimationFrame(frame);
        }
        requestAnimationFrame(frame);
    }, []);

    return <div class = "m88" ref = {marqueeRef}>
        <div>
            <img loading = "lazy" src = "/88x31/chrome_is_evil.avif" />
            <img loading = "lazy" src = "/88x31/coke.avif" />
            <img loading = "lazy" src = "/88x31/fftake.avif" />
            <img loading = "lazy" src = "/88x31/firefox.avif" />
            <img loading = "lazy" src = "/88x31/fuck_facebook.avif" />
            <img loading = "lazy" src = "/88x31/gothtml.avif" />
            <img loading = "lazy" src = "/88x31/internetprivacy.gif" />
            <img loading = "lazy" src = "/88x31/koolaid.avif" />
            <img loading = "lazy" src = "/88x31/made_on_linux.gif" />
            <img loading = "lazy" src = "/88x31/saynotoweb3.gif" />
            <img loading = "lazy" src = "/88x31/stand_up_to_google.avif" />
            <img loading = "lazy" src = "/88x31/thunderbird.avif" />
            <img loading = "lazy" src = "/88x31/ubo.avif" />
            <img loading = "lazy" src = "/88x31/vscodium.avif" />
        </div>
    </div>;
}