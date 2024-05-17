import { TaskFetcher } from "../api/fetch-tasks.js";
import { currentDate } from "../calendar/consts.js";
import { RenderCalendar } from "../features/calendar-layout.js";
import { Timeline } from "../features/timeline.js";

const renderCalendar = new RenderCalendar(currentDate);
const renderTimeline = new Timeline(currentDate).createTimeline();

const initCalendar = async () => {
  let initialWindowSize = window.innerWidth;

  renderCalendar.render();
  renderTimeline.render();

  window.addEventListener("resize", (event) => {
    if (
      (initialWindowSize > 700 && window.innerWidth <= 700) ||
      (initialWindowSize <= 700 && window.innerWidth > 700)
    ) {
      initialWindowSize = window.innerWidth;
      renderTimeline.render();
      return;
    }
  });
};

initCalendar().then(() => {
  const TF = new TaskFetcher(localStorage.getItem("user_id"));

  renderTimeline.titleDays.forEach((day) => {
    TF.fetchTasksByDay(day).then(({ tasks }) => {
      console.log(tasks, day);
    });
  });
});
