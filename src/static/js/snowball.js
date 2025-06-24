{
    const bear = document.getElementById("snowball");
    var rotation = 0;
    bear.addEventListener("click", () => {
        bear.classList.add("move");
        rotation += 3600;
        bear.style.rotate = `${rotation}deg`;
    });
    bear.addEventListener("transitionend", () => {
        bear.classList.remove("move");
        (rotation = 0), (bear.style.rotate = "0deg");
    });
}
