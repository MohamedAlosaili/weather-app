import {
  API_URL,
  options,
  starter,
  loader,
  generalDate,
  detailedDate,
  forecastContainer,
  templateBox,
  rainBar,
  rainPrecentage,
  sunriseTime,
  sunsetTime,
} from "../config.js";
import { somethingWrong } from "../app.js";
import { isDay } from "./current.js";

export async function getForecastingWeather(location) {
  try {
    const res = await fetch(API_URL + "forecast", options(location));
    const forecastData = await res.json();

    if (forecastData.location) fillForecastSection(forecastData);
  } catch (err) {
    somethingWrong(err);
  }
}

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const monthsShort = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function fillForecastSection(forecastData) {
  if (starter || loader) {
    starter.remove();
    loader.remove();
  }
  currentWeatherData(forecastData);
  const date = new Date(forecastData.forecast[0].date);

  generalDate.innerHTML = `${months[date.getMonth()]} ${date.getFullYear()}`;
  detailedDate.innerHTML = `${days[date.getDay()]}, ${
    monthsShort[date.getMonth()]
  } ${date.getDate()}, ${date.getFullYear()}`;

  fillForecastBoxes(forecastData, date);
}

function currentWeatherData(forecastData) {
  const { chance_of_rain, sunrise, sunset } = forecastData.forecast[0];

  rainBar.style.width = `${chance_of_rain}%`;
  rainPrecentage.innerHTML = `${chance_of_rain}%`;
  sunriseTime.innerHTML = sunrise;
  sunsetTime.innerHTML = sunset;
}

function fillForecastBoxes(forecastData, date) {
  forecastContainer.innerHTML = "";

  forecastData.forecast.forEach((day) => {
    forecastContainer.append(templateBox.content.cloneNode(true));
  });

  const dayBoxes = document.querySelectorAll(".day-box");

  let iconCode = (idx) => forecastData.forecast[idx].icon_url.slice(-7, -4);
  let source = isDay ? "img/weather-icons/day" : "img/weather-icons/night";

  dayBoxes.forEach((day, idx) => {
    if (idx !== 0) date.setDate(date.getDate() + 1);

    day.querySelector("[data-box-img]").src = `${source}/${iconCode(idx)}.svg`;

    if (idx <= 1) {
      if (idx === 0) day.querySelector(".day").innerHTML = "Today";
      else day.querySelector(".day").innerHTML = "Tomorrow";
    } else day.querySelector(".day").innerHTML = days[date.getDay()];

    day.querySelector(".date").innerHTML = `${
      monthsShort[date.getMonth()]
    }, ${date.getDate()}`;

    day.querySelector(".max-min-dgree").innerHTML = `${Math.round(
      forecastData.forecast[idx].min_temp_c
    )}°/${Math.round(forecastData.forecast[idx].max_temp_c)}°`;
  });
}
