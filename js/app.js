import { loader, starter } from "./config.js";
import { getCurrentWeather } from "./components/current.js";
import { getForecastingWeather } from "./components/forecast.js";
import { getCurrentLocation } from "./components/current-location.js";

const forms = document.querySelectorAll("[data-form]");
const searchs = document.querySelectorAll("[type='search']");
const userLocationBtns = document.querySelectorAll("[data-my-location]");
let location;
let previousLocation;
let lat = 0;
let lon = 0;
export const userLocation = document.querySelector("[data-user-location]");
const userLocationParent = userLocation.parentElement;
const moreInfo = document.querySelector("[data-more-info]");

loader.style.display = "block";

// Check LocalStorage
if (localStorage.getItem("location")) {
  starter.remove();
  location = localStorage.getItem("location");
  if (localStorage.getItem("current-location") === location)
    userLocation.remove();
  getCurrentWeather(location);
  getForecastingWeather(location);
} else loader.remove();

searchs.forEach((search) => {
  search.addEventListener("focus", () =>
    search.parentElement.classList.add("active")
  );
  search.addEventListener("blur", () =>
    search.parentElement.classList.remove("active")
  );
});

forms.forEach((form, idx) => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    searchFunction(searchs[idx]);
  });
});

userLocationBtns.forEach((btn) => {
  btn.addEventListener("click", getGeolocation);
  btn.addEventListener("mouseenter", (e) => e.target.classList.add("more"));
  btn.addEventListener("mouseleave", (e) => e.target.classList.remove("more"));
});

moreInfo.addEventListener("click", () =>
  moreInfo.previousElementSibling.classList.toggle("more")
);

function searchFunction(search) {
  userLocationParent.append(userLocation);
  location = search.value;

  if (location) {
    document.body.append(loader);
    loader.style.display = "block";
    if (localStorage.getItem("location")) {
      previousLocation = localStorage.getItem("location");
      localStorage.setItem("location", location);
    }
    getCurrentWeather(location);
    getForecastingWeather(location);

    search.value = "";
    search.blur();
  }
}

export function somethingWrong(message) {
  loader.remove();
  if (localStorage.getItem("location"))
    localStorage.setItem("location", previousLocation);

  const wrongBox = document.createElement("div");
  wrongBox.classList.add("wrong-box", "layer");

  wrongBox.innerHTML = `
    <div class="box">
      <h3 class="title">Opps, Something went wrong</h3>
      <p class="message">"${message}"</p>
      <button class="btn" data-close-btn>OK</button>
    </div>
  `;
  document.body.append(wrongBox);

  document
    .querySelector("[data-close-btn]")
    .addEventListener("click", () => wrongBox.remove());
}

function getGeolocation() {
  document.body.append(loader);
  loader.style.display = "block";

  navigator.geolocation.getCurrentPosition((position) => {
    lat = position.coords.latitude;
    lon = position.coords.longitude;

    getCurrentLocation(lat, lon);
  });
}
