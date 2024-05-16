import { weekDays } from "../calendar/consts.js";
import {
  countWeek,
  getMonth,
  getNextDay,
  getPreviousDay
} from "../lib/date.js";
import { capitalize } from "../lib/text.js";

export class RenderCalendar {
  constructor(currentDate) {
    this.currentDate = currentDate;
    this.monthData = getMonth(currentDate);
  }

  _getPreviousDays() {
    let previousMonthCounter = this.monthData.month;
    let previousDayCounter = 1;
    let dateData = [];

    let { index } = countWeek(
      this.currentDate.getDay() - (this.currentDate.getDay() % 7) - 2
    );

    for (const _ of new Array(index)) {
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

    return dateData.reverse();
  }

  _getNextDays(_timeline) {
    let currentMonthCounter = this.monthData.month;
    let currentDayCounter = 0;

    while (_timeline.length < 35) {
      const nextDayData = getNextDay(currentMonthCounter, currentDayCounter);
      _timeline.push({
        day: nextDayData.day,
        month: nextDayData.month
      });
      currentMonthCounter = nextDayData.month;
      currentDayCounter = nextDayData.day;
    }
    return _timeline;
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

  createTimeline() {
    return this._getNextDays(this._getPreviousDays());
  }

  render() {
    const monthSlot = document.getElementById("calendar-bar-month");
    const daysSlot = document.getElementById("calendar-bar-days");
    const weeksSlot = document.getElementById("calendar-bar-weeks");

    let daysData = "";
    let weeksData = "";

    for (const weekName of weekDays) {
      weeksData += `<div>${weekName[0].toUpperCase()}</div>`;
    }

    for (const dateData of this.createTimeline()) {
      daysData += `<div ${this.getClass(dateData)}>${dateData.day}</div>`;
    }

    monthSlot.innerText = `${capitalize(
      this.monthData.month
    )} ${this.currentDate.getFullYear()}`;
    daysSlot.innerHTML = daysData;
    weeksSlot.innerHTML = weeksData;
  }
}
