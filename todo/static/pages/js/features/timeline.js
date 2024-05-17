import { getMonth, getNextDay } from "../lib/date.js";

export class Timeline {
  constructor(currentDate) {
    this.currentDate = currentDate;
    this.monthData = getMonth(currentDate);
    this._timeline = [];
    this.titleDays = [];
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
    let _currentDate = {
      day: this.currentDate.getDate(),
      month: this.monthData.month
    };
    let counter = 0;

    for (const _ of [...new Array(5)]) {
      titlesString =
        titlesString +
        `
      <div class="task-title">
        <div class="text__default">${_currentDate.day}</div>
        <div class="text__default">${_currentDate.month}</div>
      </div>
      `;

      const currentMonth = this.currentDate.getMonth() + 1;
      this.titleDays.push(
        `${this.currentDate.getFullYear()}-${
          currentMonth < 10 ? `0${currentMonth}` : `${currentMonth}`
        }-${_currentDate.day}`
      );
      _currentDate = getNextDay(_currentDate.month, _currentDate.day);
    }

    for (const _ of [...new Array(window.innerWidth > 700 ? 5 : 1)]) {
      columnsString += `<div id="column-${counter}">`;

      for (const _ of this._timeline) {
        columnsString += `<div class="task-slot__timeline">${counter} place</div>`;
      }
      columnsString += "</div>";
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
