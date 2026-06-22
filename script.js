const apiKey = "3ca94f2309adb6b9ff4324af47dd7da7";

// MAIN WEATHER
async function getWeather() {
  const city = document.getElementById("cityInput").value;

  if (!city) {
    alert("Please enter a city");
    return;
  }

  document.getElementById("loading").classList.remove("hidden");

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    const res = await fetch(url);
    const data = await res.json();

    if (data.cod !== 200) {
      document.getElementById("weather").innerHTML = "❌ City not found";
      return;
    }

    const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    document.getElementById("weather").innerHTML = `
      <h2>${data.name}, ${data.sys.country}</h2>
      <img src="${icon}" />
      <p><b>${data.weather[0].description}</b></p>
      <p>🌡️ ${data.main.temp} °C</p>
      <p>🌬️ Wind: ${data.wind.speed} m/s</p>
    `;

    getForecast(city);

  } catch (err) {
    console.error(err);
    document.getElementById("weather").innerHTML = "Error loading data";
  }

  document.getElementById("loading").classList.add("hidden");
}

// FORECAST
async function getForecast(city) {
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

  const res = await fetch(url);
  const data = await res.json();

  let output = "";

  for (let i = 0; i < data.list.length; i += 8) {
    const item = data.list[i];
    const icon = `https://openweathermap.org/img/wn/${item.weather[0].icon}.png`;

    output += `
      <div>
        <p>${new Date(item.dt_txt).toDateString().slice(0, 10)}</p>
        <img src="${icon}" />
        <p>${item.main.temp}°C</p>
      </div>
    `;
  }

  document.getElementById("forecast").innerHTML = output;
}

// GOOGLE SEARCH ENGINE
function googleSearch() {
  const query = document.getElementById("googleInput").value;
  if (!query) return;

  window.open(`https://www.google.com/search?q=${query}`, "_blank");
}