// https://m3o.com
const API_KEY = "MmJkMDUxNzYtZTNlOC00MGQ5LWIyZjEtZWEzY2NkNjYyNmQz";
const API_URL = "https://api.m3o.com/v1/weather/";
const options = (location) => {
  return {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      location: location,
      days: 8,
    }),
  };
};

const starter = document.getElementById("starter");
const loader = document.querySelector("[data-loader]");

// Current Weather Variables
const city = document.querySelector("[data-city]");
const region = document.querySelector("[data-region]");
const currentWeatherImg = document.querySelector("[data-weather-img]");
const currentCondition = document.querySelector("[data-condition]");
const currentWeatherDegree = document.querySelector("[data-weather-degree]");

// Forecast Weather Variables
const generalDate = document.querySelector("[data-general-date]");
const detailedDate = document.querySelector("[data-detailed-date]");
const forecastContainer = document.querySelector("[data-forecast-container]");
const templateBox = document.getElementById("template-box");
const rainBar = document.querySelector("[data-rain-bar]");
const rainPrecentage = document.querySelector("[data-rain-precentage]");
const sunrise = document.querySelector("[data-sunrise]");
const sunset = document.querySelector("[data-sunset]");

// Clock Variables
const hourLine = document.getElementById("hour-line");
const minuteLine = document.getElementById("minute-line");
const secondLine = document.getElementById("second-line");
const digitalClock = document.getElementById("digital-clock");

export {
  API_URL,
  options,
  starter,
  loader,
  city,
  region,
  currentWeatherImg,
  currentCondition,
  currentWeatherDegree,
  generalDate,
  detailedDate,
  forecastContainer,
  templateBox,
  rainBar,
  rainPrecentage,
  sunrise,
  sunset,
  hourLine,
  minuteLine,
  secondLine,
  digitalClock,
};
