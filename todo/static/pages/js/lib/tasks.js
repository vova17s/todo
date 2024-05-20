export const renderTask = async (day, task) => {
  let _intermediateDate = new Date(task.plane_finished_time);
  let userTimezoneOffset = _intermediateDate.getTimezoneOffset() * 60000;
  const planedTime = new Date(_intermediateDate.getTime() + userTimezoneOffset);

  const calculatedOffset =
    planedTime.getHours() * 100 + planedTime.getMinutes() * 1.667;
  const taskChild = document.createElement("div");

  taskChild.classList.add("task");
  taskChild.style.top = `${calculatedOffset}px`;
  taskChild.innerHTML = `
    <img
      src="/static/public/task.svg"
      alt="Someone"
      class="task-img"
    />
    ${task.title}
  `;

  document.getElementById(day).appendChild(taskChild);
};
