const dateRegex = /[2][0][0-9][0-9]-[0-1][0-9]-[0-3][0-9]/gm;
const timeRegex = /[0-2][0-9]:[0-5][0-9]/gm;

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
      status_id: "d616abb4-d0e8-48fd-af4c-8c8a97757b09",
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
