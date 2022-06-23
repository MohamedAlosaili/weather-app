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
    const data = await res.json();
    console.log(data);
    if (data.location) {
      fillCurrentWeatherSection(data);
      // Call Clock Function
      // setUpTime(data.local_time);
      setUpTime("2022-06-23 3:44");
    } else somethingWrong(data.detail);
  } catch (err) {
    console.error(err);
  }
}

function fillCurrentWeatherSection(data) {
  if (starter) {
    loader.remove();
    starter.remove();
  }
  city.innerHTML = data.location;
  region.innerHTML = data.region;
  currentWeatherImg.src = `https:${data.icon_url}`;
  currentCondition.innerHTML = data.condition;
  currentWeatherDegree.innerHTML = `${Math.round(data.temp_c)}° C`;
}
