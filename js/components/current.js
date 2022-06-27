import {
  API_URL,
  options,
  city,
  regionEl,
  currentWeatherImg,
  currentCondition,
  currentWeatherDegree,
} from "../config.js";
import { somethingWrong } from "../app.js";
import { setUpTime } from "./clock.js";
import { getForecastingWeather } from "./forecast.js";

export let isDay;

export async function getCurrentWeather(location) {
  try {
    const res = await fetch(API_URL + "now", options(location));
    const currentData = await res.json();

    if (currentData.location) {
      fillCurrentWeatherSection(currentData);
      getForecastingWeather(location);

      if (
        localStorage.getItem("location") === "null" ||
        localStorage.getItem("location") === "undefined"
      )
        localStorage.setItem("location", location);

      // Call Clock Function
      setUpTime(currentData.local_time);
    } else somethingWrong(currentData.detail);
  } catch (err) {
    somethingWrong("Failed to get weather data");
  }
}

function fillCurrentWeatherSection(currentData) {
  const { location, region, icon_url, condition, temp_c, daytime } =
    currentData;

  isDay = daytime;
  let iconCode = isDay
    ? `day/${icon_url.slice(-7, -4)}.svg`
    : `night/${icon_url.slice(-7, -4)}.svg`;

  city.innerHTML = location;
  regionEl.innerHTML = region;
  currentWeatherImg.src = `img/weather-icons/${iconCode}`;
  currentCondition.innerHTML = condition;
  currentWeatherDegree.innerHTML = `${Math.round(temp_c)}° C`;
}
