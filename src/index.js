let now = new Date();

let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let weekday = weekdays[now.getDay()];
let currentDay = `${weekday} ${hours}:${minutes}`;
console.log(currentDay);
let todaysDate = document.querySelector("#current-time");
todaysDate.innerHTML = `${currentDay}`;

function searchCity(event) {
  event.preventDefault();
  let input = document.querySelector("#search-engine");
  let city = document.querySelector("#city-search");
  city.innerHTML = input.value;
  let apiKey = "62231151ce343c4d68652e1617efc22f";
  let cityName = input.value.trim();
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function displayWeatherCondition(response) {
  console.log(response);

  document.querySelector("#city-search").innerHTML = response.data.name;
  document.querySelector("#temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#feels-like").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#pressure").innerHTML = response.data.main.pressure;
  let iconElement = document.querySelector("#main-icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].main);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);

function showCurrentCityWeather(position) {
  console.log(position);
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "62231151ce343c4d68652e1617efc22f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios(apiUrl).then(displayWeatherCondition);
}

let currentButton = document.querySelector("#current-btn");
currentButton.addEventListener("submit", showCurrentCityWeather);

navigator.geolocation.getCurrentPosition(showCurrentCityWeather);

function fahrenheit1(event) {
  event.preventDefault();
  choiceF.classList.add("active");
  choiceC.classList.remove("active");
  let tempF = document.querySelector("#temp");
  tempF.innerHTML = Math.round((temperature * 9) / 5 + 32);
}

let temperature = null;

function celsius1(event) {
  event.preventDefault();
  choiceC.classList.add("active");
  choiceF.classList.remove("active");
  let tempC = document.querySelector("#temp");
  tempC.innerHTML = Math.round(temperature);
}

let choiceC = document.querySelector("#celsius");
choiceC.addEventListener("click", celsius1);

let choiceF = document.querySelector("#fahrenheit");
choiceF.addEventListener("click", fahrenheit1);
