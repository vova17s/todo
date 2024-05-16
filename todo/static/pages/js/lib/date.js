import { months, weekDays } from "../calendar/consts.js";

export const getMonth = (date) => {
  const month = Object.keys(months)[date.getMonth()];
  return {
    month: month,
    days: months[month]
  };
};

/**
 *
 * @param {number} week
 **/
export const countWeek = (week) => {
  if (week >= 0 && 6 >= week) {
    return {
      name: weekDays[week],
      index: week
    };
  }

  if (week > 6) {
    return {
      name: weekDays[week % 7],
      index: week % 7
    };
  }
  return {
    name: weekDays[(week % 7) * -1],
    index: (week % 7) * -1
  };
};

/**
 *
 * @param {Date} date
 **/
export const getWeek = (date) => {
  const month = Object.keys(months)[date.getDay() - 1];
  return {
    month: month,
    days: months[month]
  };
};

/**
 *
 * @param {string} month
 * @param {number} day
 **/
export const getPreviousDay = (month, day) => {
  if (day > 1) {
    return {
      month: month.toLowerCase(),
      day: day - 1
    };
  }

  const totalMonths = Object.keys(months);
  let monthIndex = totalMonths.findIndex(
    (currentMonth) => currentMonth === month
  );

  if (monthIndex === -1) {
    throw new Error("Invalid month");
  }
  const finalMonth = totalMonths[monthIndex === 0 ? 11 : monthIndex - 1];

  return {
    month: finalMonth,
    day: months[finalMonth]
  };
};

/**
 *
 * @param {string} month
 * @param {number} day
 **/
export const getNextDay = (month, day) => {
  if (months[month.toLowerCase()] > day) {
    return {
      month: month.toLowerCase(),
      day: day + 1
    };
  }

  const totalMonths = Object.keys(months);
  let monthIndex = totalMonths.findIndex(
    (currentMonth) => currentMonth === month
  );

  if (monthIndex === -1) {
    throw new Error("Invalid month");
  }

  const finalMonth = totalMonths[monthIndex === 11 ? 0 : monthIndex + 1];

  return {
    month: finalMonth,
    day: 1
  };
};
