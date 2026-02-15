// services/taskService.js

const API_URL = 'http://localhost:4000/api/tasks';

export const taskService = {
    // Fetch all tasks
    getAllTasks: async () => {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
    },

    // Create a new task
    createTask: async (taskData) => {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(taskData),
        });
        if (!response.ok) throw new Error('Failed to create task');
        return response.json();
    },

    // Update an existing task (PUT)
    updateTask: async (id, taskData) => {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(taskData),
        });
        if (!response.ok) throw new Error('Failed to update task');
        return response.json();
    },

    // Toggle completion status (PATCH)
    toggleTask: async (id) => {
        const response = await fetch(`${API_URL}/${id}/toggle`, {
            method: 'PATCH',
        });
        if (!response.ok) throw new Error('Failed to toggle task');
        return response.json();
    },

    // Delete a task
    deleteTask: async (id) => {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
        });
        if (response.status !== 204 && !response.ok) throw new Error('Failed to delete task');
    }
};