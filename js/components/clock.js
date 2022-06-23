import { hourLine, minuteLine, secondLine, digitalClock } from "../config.js";

let seconds;
let minutes;
let hours;
let period;
export let interval;

export function setUpTime(localTime) {
  const newDate = localTime.replace(/\s/, "T");
  console.log(typeof "2022-10-15T10:30" == typeof newDate);
  const dateAndTime = new Date("2022-10-15T10:30");
  console.log(dateAndTime);
  seconds = dateAndTime.getSeconds();
  minutes = dateAndTime.getMinutes();
  hours = dateAndTime.getHours();
  period = hours > 12 ? "PM" : "AM";

  clearInterval(interval);
  interval = setInterval(getTime, 1000);
}

export function getTime() {
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

  let clock;
  if (minutes < 10) clock = `${editedHours}:0${minutes} ${period}`;
  else clock = `${editedHours}:${minutes} ${period}`;

  digitalClock.innerHTML = clock;
}

const scale = (hours, minute) => {
  return hours * 30 + (minute / 60) * 30;
};
