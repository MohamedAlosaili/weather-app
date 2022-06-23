import {
  API_URL,
  options,
  generalDate,
  detailedDate,
  forecastContainer,
  templateBox,
  rainBar,
  rainPrecentage,
  sunrise,
  sunset,
} from "../config.js";
import { starter, removeLoader } from "../app.js";

export async function getForecastingWeather(location) {
  try {
    const res = await fetch(API_URL + "forecast", options(location));
    const forcastData = await res.json();

    if (forcastData.location) fillForecastSection(forcastData);
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

function fillForecastSection(forcastData) {
  if (starter) {
    removeLoader();
    starter.remove();
  }
  currentWeatherData(forcastData);
  const date = new Date(forcastData.forecast[0].date);

  generalDate.innerHTML = `${months[date.getMonth()]} ${date.getFullYear()}`;
  detailedDate.innerHTML = `${days[date.getDay()]}, ${
    monthsShort[date.getMonth()]
  } ${date.getDate()}, ${date.getFullYear()}`;

  fillForecastBoxes(forcastData, date);
}

function currentWeatherData(forcastData) {
  rainBar.style.width = `${forcastData.forecast[0].chance_of_rain}%`;
  rainPrecentage.innerHTML = `${forcastData.forecast[0].chance_of_rain}%`;
  sunrise.innerHTML = forcastData.forecast[0].sunrise;
  sunset.innerHTML = forcastData.forecast[0].sunset;
}

function fillForecastBoxes(forcastData, date) {
  forecastContainer.innerHTML = "";

  forcastData.forecast.forEach((day) => {
    forecastContainer.append(templateBox.content.cloneNode(true));
  });

  const dayBoxes = document.querySelectorAll(".day-box");

  dayBoxes.forEach((day, idx) => {
    day.querySelector("[data-box-img]").src =
      forcastData.forecast[idx].icon_url;

    if (idx <= 1) {
      if (idx === 0) day.querySelector(".day").innerHTML = "Today";
      else day.querySelector(".day").innerHTML = "Tomorrow";
    } else {
      const calcIdx = idx + date.getDay();
      const dayidx = calcIdx < 7 ? calcIdx : calcIdx - 7;
      day.querySelector(".day").innerHTML = days[dayidx];
    }
    day.querySelector(".date").innerHTML = `${monthsShort[date.getMonth()]}, ${
      date.getDate() + idx
    }`;
    day.querySelector(".max-min-dgree").innerHTML = `${Math.round(
      forcastData.forecast[idx].min_temp_c
    )}°/${Math.round(forcastData.forecast[idx].max_temp_c)}°`;
  });
}
