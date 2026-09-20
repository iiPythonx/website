import { ItemMapping } from "@/components/item_map";
import { Page } from "@/components/section";
import { Link } from "wouter";

export function WebringPage() {
    return <Page sections = {[
        {
            title: "Members",
            content: <ItemMapping itemList = {[
                { name: "ben's house", link: "https://iipython.dev", text: "iipython.dev" },
                { name: "k4ffu's cave", link: "https://k4ffu.dev", text: "k4ffu.dev" },
                { name: "pyx's site", link: "https://pyxfluff.dev", text: "pyxfluff.dev" },
            ]} width = "100px" />
        },
        {
            title: "Styling",
            content: <>
                <pre><code>--webring-border: #fff;                // applies a 1px border of given color to main</code></pre>
                <pre><code>--webring-background: #fff;            // applies a background color to main</code></pre>
                <pre><code>--webring-text: #fff;                  // applies a specific color to normal text</code></pre>
                <pre><code>--webring-name: #fff;                  // applies a specific color to the current site name</code></pre>
                <pre><code>--webring-icon: #fff;                  // applies a specific color to the svg icons</code></pre>
                <pre><code>--webring-border-radius: 0px;          // applies a border radius to main</code></pre>
                <pre><code>--webring-backdrop-filter: blur(0px);  // applies a backdrop filter to main</code></pre>
                <br />
                <p>
                    <code>--webring-icon</code> can also be set to <code>url(#gradient)</code> to use a gradient between <code>--webring-text</code> and <code>--webring-name</code>.
                </p>
            </>
        },
        {
            title: "Joining",
            content: <>
                <p>
                    If you would like to join the webring, please contact me via any method on my <Link href = "/contact">contact page</Link>.
                </p>
            </>
        }
    ]} />;
}
