// Copyright (c) 2024 iiPython

// Setup now playing
window._last_track = { additional_info: {} };

const now_playing = document.getElementById("now-playing");
async function update_now_playing() {
    const result = await (await fetch("https://lan.iipython.dev/now-playing")).json();
    if (!result.data) { now_playing.innerHTML = "Nothing playing."; return; };

    // Setup data
    const data = result.data.track_metadata;
    if (data.additional_info.recording_mbid === _last_track.additional_info.recording_mbid) return;
    
    // Fetch cover art from Stupidfy
    if (!window._spotify_token) {
        window._spotify_token = (await (await fetch(
            "https://accounts.spotify.com/api/token",
            {
                body: "grant_type=client_credentials",
                headers: {
                    "Authorization": `Basic ${btoa("3f974573800a4ff5b325de9795b8e603:ff188d2860ff44baa57acc79c121a3b9")}`,
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                method: "POST"
            }
        )).json()).access_token;
    }
    
    let image_url = data.additional_info.release_mbid === _last_track.additional_info.release_mbid ? _last_track.image_url : null;
    if (!image_url) {
        const images = (await (await fetch(
            `https://api.spotify.com/v1/search?q=${encodeURIComponent(`${data.artist_name} ${data.release_name}`)}&type=album&limit=1`,
            {
                headers: {
                    "Authorization": `Bearer ${_spotify_token}`,
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }
        )).json()).albums.items;

        function sort_images(available) {
            const items = [];
            for (const i of available) items.push([i.height, i.url]);
            return items.sort((a, b) => a[0] + b[0])[0][1];
        }

        image_url = images ? sort_images(images[0].images) : null;
        data.image_url = image_url;
    }

    // Push to page
    window._last_track = data;
    data.track_name = `<a href = "https://musicbrainz.org/recording/${data.additional_info.recording_mbid}">${data.track_name}</a>`;
    data.artist_name = `<a href = "https://musicbrainz.org/artist/${data.additional_info.artist_mbids[0]}">${data.artist_name}</a>`;
    now_playing.innerHTML = `
        <a href = "https://musicbrainz.org/release/${data.additional_info.release_mbid}"><img src = "${image_url}"></a>
        <div>
            ${data.track_name.length > 15 ? `<marquee scrollamount = "3">${data.track_name}</marquee>` : `<span>${data.track_name}</span>`}
            <span>${data.artist_name}</span>
        </div>
    `;
}

setInterval(update_now_playing, 10000);
update_now_playing();
