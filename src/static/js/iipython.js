// Copyright (c) 2024 iiPython

(() => {
    let last_track = { mbid: {} };
    let last_status = true;
    const now_playing = document.getElementById("now-playing");
    
    // Handle index.jinja2 loading
    function load_status() {
        const span = document.querySelector("#online span");
        if (!span) return;
        span.innerText = last_status ? "ONLINE" : "OFFLINE";
        span.style.color = last_status ? "lime" : "red";
    };

    new MutationObserver((mutations, _) => load_status()).observe(document.getElementById("content"), { childList: true });

    // Connect to Now Playing socket
    const socket = new WebSocket("wss://lan.iipython.dev/now-playing");
    socket.addEventListener("open", () => {
        socket.addEventListener("message", async (e) => {
            const raw = JSON.parse(e.data);
            last_status = raw.online_status || !!raw.now_playing;
            load_status();

            // Handle now playing
            const data = raw.now_playing;
            if (!data) { now_playing.innerHTML = "Nothing playing."; return; };
            if (data.mbid.track && data.mbid.track === last_track.mbid.track) return;
        
            // Figure out URLs
            const album_url = data.mbid.album ? `https://musicbrainz.org/release/${data.mbid.album}` : `https://last.fm/music/${data.artist}/${data.album}`;
            const artist_url = data.mbid.artist ? `https://musicbrainz.org/artist/${data.mbid.artist}` : `https://last.fm/music/${data.artist}`;
            const track_url = data.mbid.track ? `https://musicbrainz.org/recording/${data.mbid.track}` : `https://last.fm/music/${data.artist}/_/${data.track}`;

            // Push to page
            last_track = data;
            const track_link = `<a href = "${track_url}">${data.track}</a>`;
            now_playing.innerHTML = `
                <a href = "${album_url}"><img src = "${data.image}"></a>
                <div>
                    ${data.track.length > 15 ? `<marquee scrollamount = "3">${track_link}</marquee>` : `<span>${track_link}</span>`}
                    <span><a href = "${artist_url}">${data.artist}</a></span>
                </div>
            `;
        });
    });
})();
