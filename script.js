const API_KEY = "002e422030c5c1e9e9b727f63f758b3a";

async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const weatherInfo = document.getElementById("weatherInfo");

  if (city === "") {
    weatherInfo.innerHTML = "<p>Please enter a city name</p>";
    return;
  }

  weatherInfo.innerHTML = "<p>Loading...</p>";

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) {
      weatherInfo.innerHTML = "<p>City not found ❌</p>";
      return;
    }

    const data = await response.json();

      let icon = "🌤️";
    const weather = data.weather[0].main;

    if (weather === "Clouds") icon = "☁️";
    else if (weather === "Rain") icon = "🌧️";
    else if (weather === "Clear") icon = "☀️";
    else if (weather === "Snow") icon = "❄️";
    else if (weather === "Thunderstorm") icon = "⛈️";

    weatherInfo.innerHTML = `
     <div style="font-size: 50px">${icon}</div>
      <h3>${data.name}</h3>
      <p>🌡️ Temperature: ${data.main.temp} °C</p>
      <p>💧 Humidity: ${data.main.humidity}%</p>
      <p>☁️ Weather: ${data.weather[0].description}</p>
    `;
  } catch (error) {
    weatherInfo.innerHTML = "<p>Error fetching data</p>";
  }
}
