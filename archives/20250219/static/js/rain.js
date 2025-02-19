(() => {
    const rain = document.getElementById("rain");
    let increment = 0, drops = "";
    while (increment < 100) {
        const r1 = (Math.floor(Math.random() * (98 - 1 + 1) + 1));
        const r2 = (Math.floor(Math.random() * (5 - 2 + 1) + 2));
        drops += '<div class="drop" style="left: ' + increment + '%; bottom: ' + (r2 + r2 - 1 + 100) + '%; animation-delay: 0.' + r1 + 's; animation-duration: 0.5' + r1 + 's;"><div class="stem" style="animation-delay: 0.' + r1 + 's; animation-duration: 0.5' + r1 + 's;"></div></div>';
        increment += r2;
    }
    rain.innerHTML = drops;
})();