import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import TaskFilter from './components/TaskFilter';
import { taskService } from './services/taskService';
import './styles/App.css';

/**
 * Main App Component
 * 
 * Root component that manages the task management application state and orchestrates
 * all child components. Handles CRUD operations, filtering, and API communication.
 */
function App() {
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState('All'); // 'All', 'Completed', 'Pending'
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Load initial task data on component mount
    useEffect(() => {
        fetchTasks();
    }, []);

    // Fetches all tasks from the backend API
    const fetchTasks = async () => {
        setLoading(true);
        try {
            const data = await taskService.getAllTasks();
            setTasks(data);
            setError(null);
        } catch (err) {
            setError('Failed to load tasks. Is the backend running?');
        } finally {
            setLoading(false);
        }
    };

    // Creates a new task via API and updates local state
    const handleAddTask = async (newTaskData) => {
        try {
            const createdTask = await taskService.createTask(newTaskData);
            setTasks(prev => [...prev, createdTask]);
        } catch (err) {
            alert('Error adding task');
        }
    };


    // Deletes a task after user confirmation
    const handleDeleteTask = async (id) => {
        if (!window.confirm('Are you sure you want to delete this task?')) return;
        try {
            await taskService.deleteTask(id);
            setTasks(prev => prev.filter(task => task.id !== id));
        } catch (err) {
            alert('Error deleting task');
        }
    };

    //Toggles task completion status
    const handleToggleTask = async (id) => {
        try {
            const updatedTask = await taskService.toggleTask(id);
            setTasks(prev => prev.map(task => task.id === id ? updatedTask : task));
        } catch (err) {
            alert('Error updating task status');
        }
    };

    //Updates task with new data
    const handleEditTask = async (id, updatedData) => {
        try {
            const updatedTask = await taskService.updateTask(id, updatedData);
            setTasks(prev => prev.map(task => task.id === id ? updatedTask : task));
        } catch (err) {
            alert('Error editing task');
        }
    };

    //Filters tasks based on completion status
    const filteredTasks = tasks.filter(task => {
        if (filter === 'Completed') return task.completed;
        if (filter === 'Pending') return !task.completed;
        return true;
    });

    return (
        <div className="app-container">
            <header className="app-header">
                <h1>Task Manager</h1>
            </header>

            <main>
                {/* Task creation form */}
                <section className="task-form-section">
                    <TaskForm onAdd={handleAddTask} />
                </section>

                {/* Filter controls and task list */}
                <section className="task-list-section">
                    <div className="list-controls">
                        <TaskFilter currentFilter={filter} onFilterChange={setFilter} />
                    </div>

                    {error && <div className="error-message">{error}</div>}

                    {loading ? (
                        <div className="loading">Loading tasks...</div>
                    ) : (
                        <TaskList
                            tasks={filteredTasks}
                            onDelete={handleDeleteTask}
                            onToggle={handleToggleTask}
                            onEdit={handleEditTask}
                        />
                    )}
                </section>
            </main>
        </div>
    );
}

export default App;