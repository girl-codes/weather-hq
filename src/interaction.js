function updateWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let timeElement = document.querySelector("#day-time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");

  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" />`;
  cityElement.innerHTML = response.data.city;
  timeElement.innerHTML = formatDate(date);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windElement.innerHTML = `${response.data.wind.speed}km/h`;
  temperatureElement.innerHTML = Math.round(temperature) + "°C";

  getForecast(response.data.city);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "f12c79ob5a3b7240208d7843e2380dt7";
  let apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiURL).then(updateWeather);
}

function actionSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = searchInput.value;
  searchCity(searchInput.value);
}

let searchformElement = document.querySelector("#search-form");
searchformElement.addEventListener("submit", actionSearchSubmit);

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return days[date.getDay()];
}
function getForecast(city) {
  let apiKey = "f12c79ob5a3b7240208d7843e2380dt7";
  let apiURL = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiURL).then(displayForecast);
}

function displayForecast(response) {
  console.log(response.data);

  let forecastHtml = "";
  let forecastElement = document.querySelector("#forecast");

  forecastElement.innerHTML = "";
  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      let forecastHtml = `
    <div class="forecast-item">
        <div class="day-of-forecast">${formatDay(day.time)}</div>
        <img src="${day.condition.icon_url}" class="weather-forecast-icon"/>
        <div class="weather-forecast-temperature">
          <span class="weather-forecast-temperature-max">${
            Math.round(day.temperature.maximum) + "°"
          }</span>
          <span class="weather-forecast-temperature-min">${
            Math.round(day.temperature.minimum) + "°"
          }</span>
        </div>
      </div>
      `;

      forecastElement.innerHTML += forecastHtml;
    }
  });
}
searchCity("London");
