// Handle switching to main
function switch_to_main() {
    document.querySelector("header").style.display = "flex";
    document.querySelector("main div.flow").remove();
    document.body.style.backgroundColor = "#0000FF";
    document.body.style.backgroundImage = "url(/assets/noise.png)";
    document.querySelector("#page").style.display = "flex";
}

const image = document.querySelector("img.spin");
image.addEventListener("click", () => { localStorage.setItem("last", Date.now()); switch_to_main(); });
if ((Date.now() - +localStorage.getItem("last")) < 900000) switch_to_main();

// Handle "pausing"
const btn_data = {
    button: document.querySelector("header"),
    state: 0,
    text_data: {
        0: `
            PLAY
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
            </svg>
        `,
        1: `
            PAUSE
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5m5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5"/>
            </svg>
        `
    },
    fx_elem: document.getElementById("fx")
};
btn_data.button.addEventListener("click", () => {
    btn_data.fx_elem.style.display = btn_data.state ? "none" : "block";
    btn_data.state = Number(!btn_data.state);
    btn_data.button.innerHTML = btn_data.text_data[btn_data.state];
});
btn_data.button.innerHTML = btn_data.text_data[btn_data.state];

// Handle slogans
const slogans = [
    "Why is this font so weird?",
    "Now with amazing color support!",
    "I hate cheese.",
    "Ya like jazz?",
    "Reinventing the wheel since 2007.",
    "Programming takes too much effort.",
    "Why is the image a Goose?",
    "?!?!?!?!?!",
    "Nani?",
    "Minecraft was better before Microsoft bought it.",
    "Linux? You mean GNU/Linux?",
    "I have a vendetta against CSS.",
    "Bow down to our lord, Flexbox.",
    "Can I get a baguette?",
    "Zoooooooooom."
];
document.querySelector("#slogan").innerText = slogans[Math.floor(Math.random() * slogans.length)];

// More random effects
const pfp = document.querySelector(".pfp")
pfp.addEventListener("mouseover", () => pfp.classList.add("spin"));
pfp.addEventListener("mouseleave", () => pfp.classList.remove("spin"));
