import {
  API_URL,
  options,
  starter,
  loader,
  city,
  region,
  currentWeatherImg,
  currentCondition,
  currentWeatherDegree,
} from "../config.js";
import { somethingWrong } from "../app.js";
import { setUpTime } from "./clock.js";

export async function getCurrentWeather(location) {
  try {
    const res = await fetch(API_URL + "now", options(location));
    const currentData = await res.json();

    if (currentData.location) {
      fillCurrentWeatherSection(currentData);

      if (!localStorage.getItem("location"))
        localStorage.setItem("location", location);

      // Call Clock Function
      setUpTime(currentData.local_time);
    } else somethingWrong(currentData.detail);
  } catch (err) {
    somethingWrong(err);
  }
}

function fillCurrentWeatherSection(currentData) {
  if (starter || loader) {
    starter.remove();
    loader.remove();
  }
  city.innerHTML = currentData.location;
  region.innerHTML = currentData.region;
  currentWeatherImg.src = `https:${currentData.icon_url}`;
  currentCondition.innerHTML = currentData.condition;
  currentWeatherDegree.innerHTML = `${Math.round(currentData.temp_c)}° C`;
}
