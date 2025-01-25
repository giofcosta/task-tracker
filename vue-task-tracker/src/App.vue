<template>
  <div class="container">
    <h1>Weekly Task Tracker</h1>
    <table class="task-table">
      <thead>
        <tr>
          <th>Task</th>
          <th
            v-for="day in days"
            :key="day"
          >
            {{ day }}
          </th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(task, index) in tasks"
          :key="index"
        >
          <td>{{ task.name }}</td>
          <EditableCell
            v-for="(hours, dayIndex) in task.hours"
            :key="dayIndex"
            :value="hours"
            @update:value="newValue => updateHour(index, dayIndex, newValue)"
          />
          <td class="total">
            {{ totals[index] }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const tasks = ref([
  { 
    name: 'Development',
    hours: [8, 8, 8, 8, 8, 4, 4]
  },
  {
    name: 'Meetings',
    hours: [2, 1, 2, 1, 2, 0, 0]
  },
  {
    name: 'Code Reviews',
    hours: [1, 2, 1, 2, 1, 0, 0]
  }
]);

import EditableCell from './components/EditableCell.vue';

const updateHour = (taskIndex, dayIndex, newValue) => {
  tasks.value[taskIndex].hours[dayIndex] = Math.max(0, Math.min(24, newValue));
};

const totals = computed(() => tasks.value.map(task =>
  task.hours.reduce((acc, curr) => acc + curr, 0)
));
</script>

<style>
.container {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.task-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1.5rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12);
}

th, td {
  padding: 1rem;
  text-align: center;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #f8f9fa;
  font-weight: 600;
}

.total {
  font-weight: bold;
  color: #2c3e50;
}

h1 {
  color: #2c3e50;
  text-align: center;
  margin-bottom: 2rem;
}
</style>
