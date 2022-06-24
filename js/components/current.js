import {
  API_URL,
  options,
  starter,
  loader,
  city,
  regionEl,
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
  const { location, region, icon_url, condition, temp_c } = currentData;

  city.innerHTML = location;
  regionEl.innerHTML = region;
  currentWeatherImg.src = `https:${icon_url}`;
  currentCondition.innerHTML = condition;
  currentWeatherDegree.innerHTML = `${Math.round(temp_c)}° C`;
}
