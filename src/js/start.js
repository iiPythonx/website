// Handle icon loading
const getIcon = (code) => {
    switch (code) {
        case 0:
            return "sun";
        case 1:
            return "cloud_sun";
        case 2:
            return "cloud";
        case 3:
        case 45:
        case 48:
            return "clouds";
        case 51:
            return "rain0_sun"
        case 53:
        case 55:
            return "rain1_sun";
        case 56:
        case 57:
        case 66:
        case 67:
            return "rain_snow";
        case 61:
        case 80:
            return "rain0";
        case 63:
        case 81:
            return "rain1";
        case 65:
        case 82:
            return "rain2";
        case 71:
        case 77:
        case 85:
            return "snow_sun";
        case 73:
        case 75:
        case 86:
            return "snow"; 
        case 95:
        case 96:
        case 99:
            return "lightning";
    }
};

// Handle forecast processing
const forecastElement = document.getElementById("weather");
navigator.geolocation.getCurrentPosition(async (p) => {
    const lat = p.coords.latitude, lon = p.coords.longitude;
    const forecast = await (await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,precipitation_probability,wind_speed_10m,wind_direction_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=America/Chicago`)).json();
    for (let i = 0; i < 7; i++) {
        const min = forecast.daily.temperature_2m_min[i], max = forecast.daily.temperature_2m_max[i];
        const name = (new Date(forecast.daily.time[i])).toLocaleDateString("en-US", { weekday: "long", timeZone: "utc" });

        // Create element
        const element = document.createElement("div");
        element.classList.add("period");
        element.innerHTML = `
            <span>${name.slice(0, 3)}</span>
            <img src = "./assets/icons/${getIcon(forecast.daily.weather_code[i])}.png">
            <div class = "temps">
                <span>${max}°</span>
                <span class = "lows">${min}°</span>
            </div>
        `;
        forecastElement.appendChild(element);
    }
});

// Handle clock
const time = document.getElementById("time"), date = document.getElementById("date");
const updateClock = () => {
    const d = new Date();
    time.innerHTML = d.toLocaleTimeString();
    date.innerHTML = d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
};

setInterval(updateClock, 250);  // Accuracy > efficency
updateClock();
