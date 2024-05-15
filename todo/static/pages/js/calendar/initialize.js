import { currentDate, months, weekDays } from "./consts.js";

const capitalize = (str) => {
  return `${str[0].toUpperCase()}${str.slice(1)}`;
};

const getMonth = (date) => {
  const month = Object.keys(months)[date.getMonth()];
  return {
    month: month,
    days: months[month]
  };
};

const fillsSideBar = () => {
  const monthSlot = document.getElementById("calendar-bar-month");
  const daysSlot = document.getElementById("calendar-bar-days");
  const weeksSlot = document.getElementById("calendar-bar-weeks");

  const monthData = getMonth(currentDate);
  let dayCounter = 1;
  let daysData = "";
  let weeksData = "";

  while (dayCounter <= monthData.days) {
    daysData += `<div ${
      dayCounter === currentDate.getDate() ? 'class="current-day"' : ""
    }>${dayCounter}</div>`;
    dayCounter++;
  }

  for (const _ of new Array(currentDate.getDay() - 1)) {
    daysData = "<div>-</div>" + daysData;
  }

  for (const weekName of weekDays) {
    weeksData += `<div>${weekName[0].toUpperCase()}</div>`;
  }

  monthSlot.innerText = `${capitalize(
    monthData.month
  )} ${currentDate.getFullYear()}`;
  daysSlot.innerHTML = daysData;
  weeksSlot.innerHTML = weeksData;
};

fillsSideBar();
console.log(weekDays[currentDate.getDay() - 1]);
