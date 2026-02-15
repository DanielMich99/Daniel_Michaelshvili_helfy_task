import React, { useState } from 'react';
import '../styles/TaskForm.css';

/**
 * TaskForm Component
 * 
 * Provides a form interface for creating new tasks with title, description, and priority.
 * Validates required fields and resets the form after successful submission.
 * 
 * @param {function} onAdd - Callback function to handle task creation
 */
const TaskForm = ({ onAdd }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('low');

    /**
     * Handles form submission
     * Validates that title is not empty, creates task object, and resets form
     */
    const handleSubmit = (e) => {
        e.preventDefault();

        // Basic validation - title is required
        if (!title.trim()) return;

        onAdd({
            title,
            description,
            priority,
            completed: false // As default - a new task is not completed
        });

        // Reset form fields after successful submission
        setTitle('');
        setDescription('');
        setPriority('low');
    };

    return (
        <form className="task-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <input
                    type="text"
                    placeholder="Task Title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>

            <div className="form-group">
                <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className={`priority-select ${priority}`}
                >
                    <option value="low">Low Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="high">High Priority</option>
                </select>
            </div>

            <div className="form-group">
                <textarea
                    placeholder="Description (Optional)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows="2"
                />
            </div>

            <div className="form-group">
                <button type="submit" className="add-btn">
                    Add Task
                </button>
            </div>

        </form>
    );
};

export default TaskForm;