import { BASE_URL } from "../api/fetch-tasks.js";

const OPEN_STATUS_ID = "826eda8f-7a36-45d1-950d-6b9b33194a67";
const CLOSE_STATUS_ID = "9b46d68b-b58d-4732-a65b-cf1ab2c44598";

const getCredential = (key) => {
  const matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        key.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : null;
};

export const renderTask = async (day, task) => {
  let _intermediateDate = new Date(task.plane_finished_time);
  let userTimezoneOffset = _intermediateDate.getTimezoneOffset() * 60000;
  const planedTime = new Date(_intermediateDate.getTime() + userTimezoneOffset);

  const calculatedOffset =
    planedTime.getHours() * 100 + planedTime.getMinutes() * 1.667;
  const taskChild = document.createElement("div");

  taskChild.classList.add("task");

  if (task.status_id === CLOSE_STATUS_ID) {
    taskChild.classList.add("closed");
  }

  taskChild.onclick = () => {
    const current_status =
      task.status_id === OPEN_STATUS_ID ? CLOSE_STATUS_ID : OPEN_STATUS_ID;
    fetch(`${BASE_URL}/crud/task/${task.id}/`, {
      method: "PATCH",
      body: JSON.stringify({
        status_id: current_status
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRFTOKEN": getCredential("csrftoken")
      }
    }).then(() => window.location.reload());
  };

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
