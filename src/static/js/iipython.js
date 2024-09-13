// Copyright (c) 2024 iiPython

(() => {
    let last_track = { mbid: {} };
    const now_playing = document.getElementById("now-playing");
    
    // Connect to Now Playing socket
    const socket = new WebSocket("wss://lan.iipython.dev/now-playing");
    socket.addEventListener("open", () => {
        socket.addEventListener("message", async (e) => {
            const data = JSON.parse(e.data);
            if (!data) { now_playing.innerHTML = "Nothing playing."; return; };
            if (data.mbid.track && data.mbid.track === last_track.mbid.track) return;
        
            // Push to page
            last_track = data;
            const track_link = `<a href = "https://musicbrainz.org/recording/${data.mbid.track}">${data.track}</a>`;
            now_playing.innerHTML = `
                <a href = "https://musicbrainz.org/release/${data.mbid.album}"><img src = "${data.image_url}"></a>
                <div>
                    ${data.track.length > 15 ? `<marquee scrollamount = "3">${track_link}</marquee>` : `<span>${track_link}</span>`}
                    <span><a href = "https://musicbrainz.org/artist/${data.mbid.artist}">${data.artist}</a></span>
                </div>
            `;
        });
    });
})();
