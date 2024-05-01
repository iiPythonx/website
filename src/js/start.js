// Copyright (c) 2024 iiPython

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

// Handle unit processing
const unitMapping = {
    temp: { name: "Temperature", unit: "°", key: "temperature_2m" },
    rain: { name: "Precipitation", unit: "%", key: "precipitation_probability" },
    wind: { name: "Wind", unit: "km/h", key: "wind_speed_10m" }
}
for (let unit of Object.keys(unitMapping).reverse()) {
    const span = document.createElement("span");
    span.classList.add("select");
    span.innerText = unitMapping[unit].name;
    document.getElementById("chart").prepend(span, unit !== "wind" ? " | " : "");

    // Toggle temperature first
    if (unit == "temp") span.classList.add("active");

    // Handle switching between datasets
    span.addEventListener("click", () => {
        for (const span of document.getElementsByClassName("select")) span.classList.remove("active");
        span.classList.add("active");
        updateChart(window._day, unit);
    });
}

// Handle Chart.js
window._chart = null, window._forecast = null, window._day = null;
Chart.register(ChartDataLabels);
Chart.defaults.set("plugins.datalabels", { color: "#FEFEFE", align: "top" });
Chart.defaults.set("plugins.legend", { display: false });

const ctx = document.getElementById("graph");
const updateChart = (day, unit) => {
    window._day = day, window._activeUnit = unit;
    const lowerBound = Math.max(day * 24, 0), upperBound = (day + 1) * 24;
    
    // Create chart if it doesn't already exist
    if (_chart === null) {
        window._chart = new Chart(ctx, {
            type: "line",
            data: { labels: [], datasets: [] },
            options: {
                scales: {
                    x: {
                        grid: { display: false }
                    },
                    y: {
                        display: false,
                        ticks: { beginAtZero: true }
                    }
                },
                maintainAspectRatio: false,
                layout: {
                    padding: { top: 40 }    
                }   
            }
        });
    }
    
    // Load in chart data
    const d = _chart.data, o = _chart.options, u = unitMapping[unit], h = _forecast.hourly;
    d.labels = h.time.slice(lowerBound, upperBound).map(x => x.split("T")[1]);
    d.datasets = [
        {
            label: u.name,
            data: h[u.key].slice(lowerBound, upperBound).map(x => Math.round(x)),
            lineTension: 0,
            fill: true
        }
    ];
    o.scales.y.ticks = { callback: v => v + u.unit }
    o.plugins = { tooltip: { callbacks: { label: t => t.formattedValue + u.unit } } }
    window._chart.update();
}

// Handle forecast processing
const forecastElement = document.getElementById("periods");
navigator.geolocation.getCurrentPosition(async (p) => {
    const lat = p.coords.latitude, lon = p.coords.longitude, tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const forecast = await (await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,precipitation_probability,wind_speed_10m,wind_direction_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=${tz}`)).json();
    for (let i = 0; i < 7; i++) {
        const min = forecast.daily.temperature_2m_min[i], max = forecast.daily.temperature_2m_max[i];
        const name = (new Date(forecast.daily.time[i])).toLocaleDateString("en-US", { weekday: "long", timeZone: "utc" });

        // Create element
        const element = document.createElement("div");
        element.classList.add("period", i === 0 ? "active" : null);
        element.innerHTML = `
            <span>${name.slice(0, 3)}</span>
            <img src = "./assets/icons/${getIcon(forecast.daily.weather_code[i])}.png">
            <div class = "temps">
                <span>${max}°</span>
                <span class = "lows">${min}°</span>
            </div>
        `;
        forecastElement.appendChild(element);

        // Handle switching day
        element.addEventListener("click", () => {
            for (const e of document.getElementsByClassName("period")) e.classList.remove("active");
            element.classList.add("active");
            updateChart(i, window._activeUnit);
        });
    }

    // Load forecast into graph
    window._forecast = forecast;
    updateChart(0, "temp");
    document.getElementById("weather").style.display = "flex";
});

// Handle clock
const time = document.getElementById("time"), date = document.getElementById("date");
const interval = 100;

window._expected = Date.now() + interval;

const updateClock = () => {
    const dt = Date.now() - window._expected;
    if (dt > interval) window._expected = Date.now() + interval;

    // Handle clock updating
    const d = new Date(Date.now() - dt);
    time.innerHTML = d.toLocaleTimeString();
    date.innerHTML = d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

    // Sync our timing window
    window._expected += interval;
    setTimeout(updateClock, Math.max(0, interval - dt));
};

setTimeout(updateClock, interval);
updateClock();

// Handle searching
const input = document.getElementById("input");
window._buffer = "";
document.addEventListener("keydown", (e) => {
    if (e.key.length === 1 && !(e.ctrlKey || e.altKey)) window._buffer += e.key;
    if (e.key === "Backspace" && _buffer) window._buffer = _buffer.substring(0, _buffer.length - 1);
    if (e.key === "Enter" && _buffer) location.href = `//google.com/search?q=${_buffer}`;
    input.innerHTML = _buffer;
});
