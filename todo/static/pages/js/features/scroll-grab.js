document.addEventListener("DOMContentLoaded", function () {
  const calendar = document.getElementById("tasks-body");
  const timeline = document.getElementById("tasks-times");

  let pos = { top: 0, y: 0 };

  const mouseDownHandler = function (e) {
    pos = {
      top: timeline.scrollTop,
      y: e.clientY
    };

    document.addEventListener("mousemove", mouseMoveHandler);
    document.addEventListener("mouseup", mouseUpHandler);
  };

  const mouseMoveHandler = function (e) {
    const dy = e.clientY - pos.y;

    calendar.scrollTop = pos.top - dy;
    timeline.scrollTop = pos.top - dy;
  };

  const mouseUpHandler = function () {
    document.removeEventListener("mousemove", mouseMoveHandler);
    document.removeEventListener("mouseup", mouseUpHandler);
  };

  calendar.addEventListener("mousedown", mouseDownHandler);
  timeline.addEventListener("mousedown", mouseDownHandler);

  calendar.addEventListener("wheel", (e) => {
    const countedY = calendar.scrollTop + e.deltaY;
    calendar.scrollTop = countedY;
    timeline.scrollTop = countedY;

    console.log(calendar, timeline);
  });
});
