import {
  API_URL,
  options,
  city,
  region,
  currentWeatherImg,
  currentCondition,
  currentWeatherDegree,
} from "../config.js";
import { starter, loader, somethingWrong } from "../app.js";
import { setUpTime } from "./clock.js";

export async function getCurrentWeather(location) {
  try {
    const res = await fetch(API_URL + "now", options(location));
    const currentData = await res.json();
    console.log(currentData);
    if (currentData.location) {
      fillCurrentWeatherSection(currentData);
      // Call Clock Function
      // currentData.local_time
      setUpTime(currentData.local_time);
    } else somethingWrong(currentData.detail);
  } catch (err) {
    console.error(err);
  }
}

function fillCurrentWeatherSection(currentData) {
  if (starter) {
    loader.remove();
    starter.remove();
  }
  city.innerHTML = currentData.location;
  region.innerHTML = currentData.region;
  currentWeatherImg.src = `https:${currentData.icon_url}`;
  currentCondition.innerHTML = currentData.condition;
  currentWeatherDegree.innerHTML = `${Math.round(currentData.temp_c)}° C`;
}
