import { defineStore } from "pinia";
import axios from "axios";

export const useTaskStore = defineStore("tasks", {
  state: () => ({
    tasks: [],
    apiUrl: process.env.VUE_APP_API_URL || "http://localhost:3001/api",
  }),
  actions: {
    async fetchTasks() {
      try {
        const response = await axios.get(`${this.apiUrl}/tasks`);
        this.tasks = response.data;
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    },
    async updateTask(updatedTask) {
      try {
        await axios.put(`${this.apiUrl}/tasks/${updatedTask.id}`, updatedTask);
        const index = this.tasks.findIndex((t) => t.id === updatedTask.id);
        if (index !== -1) {
          this.tasks.splice(index, 1, updatedTask);
        }
      } catch (error) {
        console.error("Error updating task:", error);
      }
    },
    addTask(newTask) {
      this.tasks.unshift(newTask); // Add to beginning of list
    },
  },
});
