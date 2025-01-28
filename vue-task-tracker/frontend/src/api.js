const API_BASE_URL = process.env.REACT_APP_API_URL || "/api";

export const getTasks = () => fetch(`${API_BASE_URL}/tasks`);
export const createTask = (task) =>
  fetch(`${API_BASE_URL}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
