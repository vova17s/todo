import { currentDate } from "../calendar/consts.js";
import { RenderCalendar } from "../features/calendar-layout.js";
import { Timeline } from "../features/timeline.js";

const renderCalendar = new RenderCalendar(currentDate);
const renderTimeline = new Timeline(currentDate).createTimeline();

renderCalendar.render();
renderTimeline.render();

window.addEventListener("resize", (event) => {
  renderTimeline.render();
});
