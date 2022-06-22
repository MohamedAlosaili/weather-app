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
import { starter, loader, somethingWrong } from "../app.js";

export async function getForecastingWeather(location) {
  try {
    const res = await fetch(API_URL + "forecast", options(location));
    const data = await res.json();

    if (data.location) fillForecastSection(data);
  } catch (err) {
    console.error(err);
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

function fillForecastSection(data) {
  if (starter) {
    loader.remove();
    starter.remove();
  }
  currentWeatherData(data);
  const date = new Date(data.forecast[0].date);

  generalDate.innerHTML = `${months[date.getMonth()]} ${date.getFullYear()}`;
  detailedDate.innerHTML = `${days[date.getDay()]}, ${
    monthsShort[date.getMonth()]
  } ${date.getDate()}, ${date.getFullYear()}`;

  fillForecastBoxes(data, date);
}

function currentWeatherData(data) {
  rainBar.style.width = `${data.forecast[0].chance_of_rain}%`;
  rainPrecentage.innerHTML = `${data.forecast[0].chance_of_rain}%`;
  sunrise.innerHTML = data.forecast[0].sunrise;
  sunset.innerHTML = data.forecast[0].sunset;
}

function fillForecastBoxes(data, date) {
  forecastContainer.innerHTML = "";

  data.forecast.forEach((day) => {
    forecastContainer.append(templateBox.content.cloneNode(true));
  });

  const dayBoxes = document.querySelectorAll(".day-box");

  dayBoxes.forEach((day, idx) => {
    day.querySelector("[data-box-img]").src = data.forecast[idx].icon_url;

    if (idx <= 1) {
      if (idx === 0) day.querySelector(".day").innerHTML = "Today";
      else day.querySelector(".day").innerHTML = "Tomorrow";
    } else {
      const dayidx =
        6 - (6 - date.getDay()) + idx < 7 ? 6 - (6 - date.getDay()) + idx : 0;
      day.querySelector(".day").innerHTML = days[dayidx];
    }
    day.querySelector(".date").innerHTML = `${monthsShort[date.getMonth()]}, ${
      date.getDate() + idx
    }`;
    day.querySelector(".max-min-dgree").innerHTML = `${Math.round(
      data.forecast[idx].min_temp_c
    )}°/${Math.round(data.forecast[idx].max_temp_c)}°`;
  });
}
