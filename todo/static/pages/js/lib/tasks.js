const OPEN_STATUS_ID = "826eda8f-7a36-45d1-950d-6b9b33194a67";
const CLOSE_STATUS_ID = "9b46d68b-b58d-4732-a65b-cf1ab2c44598";
// const OPEN_STATUS_ID = "6ce7a55b-bb05-4323-9909-adebf78aa9e5";
// const CLOSE_STATUS_ID = "a9e4a890-f309-4a2e-9275-932f9581cd5a";

const toggleConfirmModal = (event) => {
  if (event.target !== event.currentTarget) return;

  const modal = document.getElementById("modal-confirm");
  modal.classList.toggle("open");
};

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

  taskChild.onclick = (event) => {
    localStorage.setItem("current_task_id", task.id);
    localStorage.setItem(
      "current_task_config",
      JSON.stringify({
        method: "PATCH",
        body: JSON.stringify({
          status_id:
            task.status_id === OPEN_STATUS_ID ? CLOSE_STATUS_ID : OPEN_STATUS_ID
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-CSRFTOKEN": getCredential("csrftoken")
        }
      })
    );
    const togglePlace = document.getElementById("task-place__toggle");
    const namePlace = document.getElementById("task-place__name");

    namePlace.innerText = task.title;
    togglePlace.innerText =
      task.status_id === OPEN_STATUS_ID ? "Закрыть" : "Открыть";

    toggleConfirmModal(event);
  };

  taskChild.classList.add("task");
  if (task.status_id === CLOSE_STATUS_ID) {
    taskChild.classList.add("closed");
  }

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
