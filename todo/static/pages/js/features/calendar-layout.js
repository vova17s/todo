import { weekDays } from "../calendar/consts.js";
import { getMonth, getNextDay, getPreviousDay } from "../lib/date.js";
import { capitalize } from "../lib/text.js";

/**
 *
 * Зарефачить календарь (калечно сделал)
 *
 * **/

export class RenderCalendar {
  constructor(currentDate) {
    this.currentDate = currentDate;
    this.monthData = getMonth(currentDate);
    this.prerenderDateData = [];
  }

  _getPreviousDays() {
    let previousMonthCounter = this.monthData.month;
    let previousDayCounter = 1;
    let dateData = [];

    for (const _ of new Array(35 - this.prerenderDateData.length)) {
      const previousDayData = getPreviousDay(
        previousMonthCounter,
        previousDayCounter
      );
      dateData.push({
        day: previousDayData.day,
        month: previousDayData.month
      });
      previousMonthCounter = previousDayData.month;
      previousDayCounter = previousDayData.day;
    }

    this.prerenderDateData = dateData.reverse();

    return this;
  }

  _getNextDays() {
    let currentMonthCounter = this.monthData.month;
    let currentDayCounter = 0;

    while (this.prerenderDateData.length < 35) {
      const nextDayData = getNextDay(currentMonthCounter, currentDayCounter);
      this.prerenderDateData.push({
        day: nextDayData.day,
        month: nextDayData.month
      });
      currentMonthCounter = nextDayData.month;
      currentDayCounter = nextDayData.day;
    }
    return this;
  }

  getClass(dateData) {
    if (dateData.day === this.currentDate.getDate()) {
      return 'class="day__current"';
    }

    if (dateData.month !== getMonth(this.currentDate).month) {
      return 'class="month__previous"';
    }

    return "";
  }

  createTimeline() {}

  render() {
    const monthSlot = document.getElementById("calendar-bar-month");
    const daysSlot = document.getElementById("calendar-bar-days");
    const weeksSlot = document.getElementById("calendar-bar-weeks");

    let daysData = "";
    let weeksData = "";

    for (const weekName of weekDays) {
      weeksData += `<div>${weekName[0].toUpperCase()}</div>`;
    }

    for (const dateData of this.prerenderDateData) {
      daysData += `<div ${this.getClass(dateData)}>${dateData.day}</div>`;
    }

    monthSlot.innerText = `${capitalize(
      this.monthData.month
    )} ${this.currentDate.getFullYear()}`;
    daysSlot.innerHTML = daysData;
    weeksSlot.innerHTML = weeksData;
  }
}
