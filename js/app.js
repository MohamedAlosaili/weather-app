import { starter, loader } from "./config.js";
import { getCurrentWeather } from "./components/current.js";
import { getForecastingWeather } from "./components/forecast.js";
import { getCurrentLocation } from "./components/current-location.js";

loader.remove();
const forms = document.querySelectorAll("[data-form]");
const searchs = document.querySelectorAll("[type='search']");
const userLocationBtns = document.querySelectorAll("[data-my-location]");
let location;
let previousLocation;
let lat = 0;
let lon = 0;
const userLocation = document.querySelector("[data-user-location]");
const moreInfo = document.querySelector("[data-more-info]");

// Check LocalStorage
if (localStorage.getItem("location")) {
  starter.remove();
  location = localStorage.getItem("location");
  getCurrentWeather(location);
  getForecastingWeather(location);
}

searchs.forEach((search) => {
  search.addEventListener("focus", () =>
    search.parentElement.classList.add("active")
  );
  search.addEventListener("blur", () =>
    search.parentElement.classList.remove("active")
  );
});

forms.forEach((form, idx) => {
  form.addEventListener("submit", (e) => searchFunction(e, searchs[idx]));
});

userLocationBtns.forEach((btn) => {
  btn.addEventListener("click", getGeolocation);
  btn.addEventListener("mouseenter", (e) => e.target.classList.add("more"));
  btn.addEventListener("mouseleave", (e) => e.target.classList.remove("more"));
});
moreInfo.addEventListener("click", () =>
  moreInfo.previousElementSibling.classList.toggle("more")
);

function searchFunction(e, search) {
  userLocation.parentElement.append(userLocation);
  e.preventDefault();
  location = search.value;

  if (location) {
    previousLocation = localStorage.getItem("location");
    document.body.append(loader);
    loader.style.display = "block";

    localStorage.setItem("location", location);
    getCurrentWeather(location);
    getForecastingWeather(location);

    search.value = "";
    search.blur();
  }
}

export function somethingWrong(message) {
  loader.remove();
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
  userLocation.remove();
  document.body.append(loader);
  loader.style.display = "block";

  navigator.geolocation.getCurrentPosition((position) => {
    lat = position.coords.latitude;
    lon = position.coords.longitude;

    getCurrentLocation(lat, lon);
  });
}
