import { hourLine, minuteLine, secondLine, digitalClock } from "../config.js";

let seconds;
let minutes;
let hours;
let period;
let interval;

export function setUpTime(localTime) {
  const timeArr = localTime.slice(localTime.indexOf(" ") + 1).split(":");
  const time = new Date();
  time.setHours(timeArr[0], timeArr[1]);
  seconds = time.getSeconds();
  minutes = time.getMinutes();
  hours = time.getHours();
  period = hours > 12 ? "PM" : "AM";

  clearInterval(interval);
  interval = setInterval(getTime, 1000);
}

function getTime() {
  seconds++;
  if (seconds === 60) {
    seconds = 0;
    minutes++;
    if (minutes === 60) {
      minutes = 0;
      hours++;
      if (hours > 23) hours = 0;
    }
  }

  period = hours >= 12 ? "PM" : "AM";
  let editedHours = hours;

  if (editedHours === 0) {
    editedHours = 12;
  } else if (editedHours > 12) {
    editedHours = editedHours % 12;
  }
  secondLine.style.transform = `translateX(-50%) rotate(${seconds * 6}deg)`;
  minuteLine.style.transform = `translateX(-50%) rotate(${minutes * 6}deg)`;
  hourLine.style.transform = `translateX(-50%) rotate(${scale(
    editedHours,
    minutes
  )}deg)`;

  if (minutes < 10)
    digitalClock.innerHTML = `${editedHours}:0${minutes} ${period}`;
  else digitalClock.innerHTML = `${editedHours}:${minutes} ${period}`;
}

const scale = (hours, minute) => {
  return hours * 30 + (minute / 60) * 30;
};
