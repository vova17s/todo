document.addEventListener("DOMContentLoaded", function () {
  const calendar = document.getElementById("tasks-payload");

  let pos = { top: 0, y: 0 };

  const mouseDownHandler = function (e) {
    pos = {
      top: calendar.scrollTop,
      y: e.clientY
    };

    document.addEventListener("mousemove", mouseMoveHandler);
    document.addEventListener("mouseup", mouseUpHandler);
  };

  const mouseMoveHandler = function (e) {
    const dy = e.clientY - pos.y;

    calendar.scrollTop = pos.top - dy;
  };

  const mouseUpHandler = function () {
    document.removeEventListener("mousemove", mouseMoveHandler);
    document.removeEventListener("mouseup", mouseUpHandler);
  };

  calendar.addEventListener("mousedown", mouseDownHandler);
});
