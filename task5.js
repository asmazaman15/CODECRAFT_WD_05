const API_KEY = "28f2e5ca29b9ed875ad2a1d2b679e6a2";

function getWeather() {
  const city = document.getElementById("cityInput").value.trim();

  if (!city) {
    alert("Please enter a city name (e.g. Lahore,PK)");
    return;
  }

  const encodedCity = encodeURIComponent(city);  // ✅ Safely encode user input
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodedCity}&appid=${API_KEY}&units=metric`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      console.log(data);  // Debug output

      if (data.cod === 200) {
        document.getElementById("weatherBox").classList.remove("hidden");
        document.getElementById("location").textContent = `📍 ${data.name}, ${data.sys.country}`;
        document.getElementById("description").textContent = `🌤 ${data.weather[0].description}`;
        document.getElementById("temperature").textContent = `🌡 Temp: ${data.main.temp} °C`;
        document.getElementById("humidity").textContent = `💧 Humidity: ${data.main.humidity}%`;
      } else {
        alert(`❌ Error: ${data.message}`);
      }
    })
    .catch(() => alert("⚠️ Failed to fetch weather. Check internet or API key."));
}
