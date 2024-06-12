export const BASE_URL = "https://todo.labofdev.ru/api/v1";
// export const BASE_URL = "http://localhost:8000/api/v1";

export class TaskFetcher {
  constructor(user_id) {
    this.days = new Set([]);
    this.user_id = user_id;
  }

  async fetchTasksByDay(date) {
    const request = await fetch(
      `${BASE_URL}/crud/list/?plane_finished_time=${date}&user_id=${this.user_id}`,
      {
        method: "GET"
      }
    );
    this.days.add(date);
    return await request.json();
  }

  async refetch() {
    const result = {};

    for (const day of this.days) {
      result[day] = await this.fetchTasksByDay(day);
    }

    return result;
  }
}
