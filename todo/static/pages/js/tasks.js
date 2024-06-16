const dateRegex = /[2][0][0-9][0-9]-[0-1][0-9]-[0-3][0-9]/gm;
const timeRegex = /[0-2][0-9]:[0-5][0-9]/gm;
const OPEN_STATUS_ID = "826eda8f-7a36-45d1-950d-6b9b33194a67";
const CLOSE_STATUS_ID = "9b46d68b-b58d-4732-a65b-cf1ab2c44598";
// const OPEN_STATUS_ID = "6ce7a55b-bb05-4323-9909-adebf78aa9e5";
// const CLOSE_STATUS_ID = "a9e4a890-f309-4a2e-9275-932f9581cd5a";

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

const toggleCreateModal = (event) => {
  if (event.target !== event.currentTarget) return;

  const modal = document.getElementById("modal-create");
  modal.classList.toggle("open");
};

const toggleConfirmModal = (event) => {
  if (event.target !== event.currentTarget) return;

  const modal = document.getElementById("modal-confirm");
  modal.classList.toggle("open");
};

const closeTask = (event) => {
  const currentTaskId = localStorage.getItem("current_task_id");
  const currentTaskConfig = JSON.parse(
    localStorage.getItem("current_task_config")
  );

  fetch(`/api/v1/crud/task/${currentTaskId}/`, currentTaskConfig).then(() => {
    toggleConfirmModal(event);
    window.location.reload();
  });
};

const submitHandler = (event) => {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);

  let matchedDate = formData.getAll("plane_finished_date")[0].match(dateRegex);
  let matchedTime = formData.getAll("plane_finished_time")[0].match(timeRegex);

  console.log(matchedDate, matchedTime);

  if (matchedDate === null) {
    alert("Неверный формат даты!");
    return;
  }

  if (matchedTime === null) {
    alert("Неверный формат времени!");
    return;
  }

  matchedDate = matchedDate[0];
  matchedTime = matchedTime[0];

  fetch("/api/v1/crud/task/", {
    body: JSON.stringify({
      title: formData.getAll("title")[0],
      description: formData.getAll("description")[0],
      status_id: OPEN_STATUS_ID,
      plane_finished_time: `${matchedDate}T${matchedTime}:00.000Z`,
      user_id: localStorage.getItem("user_id")
    }),
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-CSRFTOKEN": getCredential("csrftoken")
    }
  }).then(() => window.location.reload());
};
