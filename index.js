const apiKey = "639291cdcc4e034a19f05ad42abfbe4f";
const apiUrl = "https://api.weatherstack.com/current?access_key=";

const inputEl = document.getElementById("input");
const searchBtn = document.querySelector(".search-btn");
const clearBtn = document.querySelector(".clear-btn");

const cityEl = document.querySelector(".city");
const windEl = document.querySelector(".wind");
const humidityEl = document.querySelector(".humidity");
const temperatureEl = document.querySelector(".temperature");
const errorMessageEl = document.querySelector(".error-message");

async function checkWeather(city) {
  try {
    const response = await fetch(apiUrl + apiKey + `&query=${city}`);

    if (!response.ok) {
      throw new Error("Failed to fetch weather data");
    }

    const data = await response.json();

    if (data.current) {
      errorMessageEl.style.display = "none";

      cityEl.textContent = data.location.name;
      windEl.textContent = data.current.wind_speed;
      humidityEl.textContent = data.current.humidity;
      temperatureEl.textContent = data.current.temperature;
    } else {
      errorMessageEl.style.display = "block";
    }
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

searchBtn.addEventListener("click", () => {
  const city = inputEl.value;
  checkWeather(city);
});

clearBtn.addEventListener("click", () => {
  cityEl.textContent = "";
  windEl.textContent = "";
  humidityEl.textContent = "";
  temperatureEl.textContent = "";
  inputEl.value = "";
});
