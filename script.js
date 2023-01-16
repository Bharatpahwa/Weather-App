"use strict";
const LandingScreen = document.querySelector(".LandingScreen");
const GetStarted = document.querySelector(".GetStarted");
const Screen1 = document.querySelector(".Weather-UI");
const CurrentTemp = document.querySelector(".Temp-Condition");
const CurrentDate = document.querySelector(".Date");
const sunrise = document.querySelector("#SunRise");
const sunset = document.querySelector("#SunSet");
const maxtemp = document.querySelector("#maxtemp");
const mintemp = document.querySelector("#mintemp");
const pressure = document.querySelector("#pressure");
const windspeed = document.querySelector("#windspeed");
const rain = document.querySelector("#rain");
const snowfall = document.querySelector("#snowfall");
const humidity = document.querySelector("#humidity");

GetStarted.addEventListener("click", function () {
  LandingScreen.style.display = "none";
  Screen1.style.display = "flex";
  weather();
  RenderDate();
});

const RenderDate = function (data) {
  const CurrentDateandtime = new Date();
  const html = `<p class="CurrentDate">${CurrentDateandtime.toDateString()}</p>
  `;
  CurrentDate.insertAdjacentHTML("afterbegin", html);
};

const RenderCurrentTemp = function (data) {
  console.log(data);
  const html = `
  <p class="CurrentTemperature">${data.current_weather.temperature}<sup class="Degree">${data.daily_units.temperature_2m_max}</sup></p>
  <p class="CurrentWeatherTy">Sunny</p>
    `;
  CurrentTemp.insertAdjacentHTML("afterbegin", html);
};

const RenderSunRIse = function (data) {
  const html = `
  <p class="statName">Sun Rise</p>
  <p class="stat-Amount">${data.daily.sunrise[0].slice(-5)}</p>`;
  sunrise.insertAdjacentHTML("afterbegin", html);
};

const RenderSunSet = function (data) {
  const html = `
  <p class="statName"> Sun Set</p>
  <p class="stat-Amount">${data.daily.sunset[0].slice(-5)}</p>`;
  sunset.insertAdjacentHTML("afterbegin", html);
};

const RenderMaxTemp = function (data) {
  const html = `
  <p class="statName">Max Temp</p>
  <p class="stat-Amount">${data.daily.temperature_2m_max[0]} ${data.daily_units.temperature_2m_max}</p>`;
  maxtemp.insertAdjacentHTML("afterbegin", html);
};

const RenderMinTemp = function (data) {
  const html = `
  <p class="statName">Min Temp</p>
  <p class="stat-Amount">${data.daily.temperature_2m_min[0]} ${data.daily_units.temperature_2m_max}</p>`;
  mintemp.insertAdjacentHTML("afterbegin", html);
};

const RenderWindSpeed = function (data) {
  const html = `
  <p class="statName">Wind Speed</p>
  <p class="stat-Amount">${data.current_weather.windspeed} km/h</p>`;
  windspeed.insertAdjacentHTML("afterbegin", html);
};

const RenderPressure = function (data) {
  const html = `
  <p class="statName">Pressure</p>
  <p class="stat-Amount">${data.hourly.surface_pressure[0]} hPa </p>`;
  pressure.insertAdjacentHTML("afterbegin", html);
};

const RenderRain = function (data) {
  const html = `
  <p class="statName">Rain</p>
  <p class="stat-Amount">${data.hourly.rain[0]} mm </p>`;
  rain.insertAdjacentHTML("afterbegin", html);
};

const RenderSnowFall = function (data) {
  const html = `
  <p class="statName">Snow Fall</p>
  <p class="stat-Amount">${data.hourly.snowfall[0]} cm </p>`;
  snowfall.insertAdjacentHTML("afterbegin", html);
};

const RenderHumidity = function (data) {
  const html = `
  <p class="statName">Humidity</p>
  <p class="stat-Amount">${data.hourly.relativehumidity_2m[0]} % </p>`;
  humidity.insertAdjacentHTML("afterbegin", html);
};

const weather = async function () {
  const getposition = function () {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };

  const positiongathered = await getposition();
  const { latitude: Lat, longitude: Lan } = positiongathered.coords;
  const fixedLat = Lat.toFixed(2);
  const fixedLan = Lan.toFixed(2);
  console.log(fixedLan, fixedLat);

  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${fixedLat}&longitude=${fixedLan}&hourly=temperature_2m,relativehumidity_2m,dewpoint_2m,apparent_temperature,precipitation,rain,snowfall,weathercode,surface_pressure,windspeed_180m&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum&current_weather=true&timezone=auto&past_days=0`
  );
  const responseOut = await response.json();
  RenderCurrentTemp(responseOut);
  RenderSunRIse(responseOut);
  RenderSunSet(responseOut);
  RenderMaxTemp(responseOut);
  RenderMinTemp(responseOut);
  RenderWindSpeed(responseOut);
  RenderHumidity(responseOut);
  RenderRain(responseOut);
  RenderSnowFall(responseOut);
  RenderPressure(responseOut);
};
