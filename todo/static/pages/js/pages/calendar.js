import { TaskFetcher } from "../api/fetch-tasks.js";
import { currentDate } from "../calendar/consts.js";
import { RenderCalendar } from "../features/calendar-layout.js";
import { Timeline } from "../features/timeline.js";
import { renderTask } from "../lib/tasks.js";

const renderCalendar = new RenderCalendar(currentDate);
const renderTimeline = new Timeline(currentDate).createTimeline();
const TF = new TaskFetcher(localStorage.getItem("user_id"));

const initCalendar = async () => {
  let initialWindowSize = window.innerWidth;

  renderCalendar.render();
  renderTimeline.render();

  window.addEventListener("resize", () => {
    if (
      (initialWindowSize > 700 && window.innerWidth <= 700) ||
      (initialWindowSize <= 700 && window.innerWidth > 700)
    ) {
      initialWindowSize = window.innerWidth;
      renderTimeline.render().then(async () => {
        for (const [day, { tasks }] of Object.entries(await TF.refetch())) {
          tasks.forEach((task) => {
            const taskChild = document.createElement("div");
            taskChild.classList.add("task");
            taskChild.innerText = task.title;
            document.getElementById(day).appendChild(taskChild);
          });
        }
      });
      return;
    }
  });
};

initCalendar().then(() => {
  renderTimeline.titleDays.forEach((day) => {
    console.log(day);
    TF.fetchTasksByDay(day).then(({ tasks }) => {
      tasks.forEach((task) => renderTask(day, task));
    });
  });
});
