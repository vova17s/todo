import { getMonth, getNextDay } from "../lib/date.js";

export class Timeline {
  constructor(currentDate) {
    this.currentDate = currentDate;
    this.monthData = getMonth(currentDate);
    this._timeline = [];
  }

  createTimeline() {
    const timeline = [];
    let counter = 0;

    while (counter < 24) {
      timeline.push(counter < 10 ? `0${counter}:00` : `${counter}:00`);
      counter++;
    }

    this._timeline = [...timeline];
    return this;
  }

  async _prepare_timeline() {
    let timelineString = "";

    for (const currentTime of this._timeline) {
      timelineString =
        timelineString +
        `<div class="time__timeline text__default">${currentTime}</div>`;
    }

    return timelineString;
  }

  async _prepare_columns() {
    let titlesString = "";
    let columnsString = "";
    let currentDayCounter = this.currentDate.getDate();
    let currentMonthCounter = this.monthData.month;
    let counter = 0;

    for (const _ of [...new Array(5)]) {
      titlesString =
        titlesString +
        `
      <div class="task-title">
        <div class="text__default">${currentDayCounter}</div>
        <div class="text__default">${currentMonthCounter}</div>
      </div>
      `;
      columnsString += "<div>";
      for (const _ of this._timeline) {
        columnsString += `<div class="task-slot__timeline">${counter} place</div>`;
      }

      columnsString += "</div>";

      const nextDayData = getNextDay(currentMonthCounter, currentDayCounter);
      currentMonthCounter = nextDayData.month;
      currentDayCounter = nextDayData.day;

      counter++;
    }

    return {
      title: titlesString,
      column: columnsString
    };
  }

  render() {
    const timelineSlot = document.getElementById("tasks-times");
    const titleSlot = document.getElementById("tasks-titles");
    const columnsSlot = document.getElementById("tasks-body");

    this._prepare_timeline().then((result) => {
      timelineSlot.innerHTML = result;
    });
    this._prepare_columns().then(({ column, title }) => {
      titleSlot.innerHTML = title;
      columnsSlot.innerHTML = column;
    });

    return this;
  }
}
