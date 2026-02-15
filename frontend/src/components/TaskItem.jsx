import React, { useState } from 'react';
import '../styles/TaskItem.css';

/**
 * TaskItem Component
 * 
 * Displays an individual task card with edit, delete, and toggle completion functionality.
 * Supports inline editing mode with save/cancel actions.
 * 
 * @param {object} task - The task object containing id, title, description, priority, and completed status
 * @param {function} onDelete - Callback function to handle task deletion
 * @param {function} onToggle - Callback function to toggle task completion status
 * @param {function} onEdit - Callback function to handle task updates
 */
const TaskItem = ({ task, onDelete, onToggle, onEdit }) => {
    const [isEditing, setIsEditing] = useState(false);

    // Separate state for each editable field during edit mode
    const [editedTitle, setEditedTitle] = useState(task.title);
    const [editedDescription, setEditedDescription] = useState(task.description);
    const [editedPriority, setEditedPriority] = useState(task.priority);

    /**
     * Enters edit mode and loads current task values into edit state
     */
    const handleEditClick = () => {
        setEditedTitle(task.title);
        setEditedDescription(task.description);
        setEditedPriority(task.priority);
        setIsEditing(true);
    };

    /**
     * Saves the edited task data
     * Validates that title is not empty and preserves completion status
     */
    const handleSave = () => {
        if (editedTitle.trim()) {
            onEdit(task.id, {
                title: editedTitle,
                description: editedDescription,
                priority: editedPriority,
                completed: task.completed // Preserve existing completion status
            });
            setIsEditing(false);
        }
    };

    /**
     * Cancels edit mode without saving changes
     */
    const handleCancel = () => {
        setIsEditing(false);
    };

    /**
     * Returns the appropriate color code for each priority level
     */
    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'high': return '#dc3545';
            case 'medium': return '#ffc107';
            case 'low': return '#28a745';
            default: return '#6c757d';
        }
    };

    // Render edit mode UI
    if (isEditing) {
        return (
            <div className="task-card editing">
                <input
                    type="text"
                    className="edit-input title"
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                    placeholder="Task Title"
                    autoFocus
                />

                <select
                    className="edit-select"
                    value={editedPriority}
                    onChange={(e) => setEditedPriority(e.target.value)}
                >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>

                <textarea
                    className="edit-textarea"
                    value={editedDescription}
                    onChange={(e) => setEditedDescription(e.target.value)}
                    placeholder="Description"
                    rows="3"
                />

                <div className="edit-actions">
                    <button className="save-btn" onClick={handleSave}>Save</button>
                    <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
                </div>
            </div>
        );
    }

    // Render standard view mode UI
    return (
        <div className={`task-card ${task.completed ? 'completed' : ''}`}>
            <div className="card-header">
                <span
                    className="priority-badge"
                    style={{ backgroundColor: getPriorityColor(task.priority) }}
                >
                    {task.priority}
                </span>
                <div className="header-actions">
                    <button
                        className="icon-btn edit-btn"
                        onClick={handleEditClick}
                        title="Edit Task"
                    >
                        ✎
                    </button>
                    <button
                        className="icon-btn delete-btn"
                        onClick={() => onDelete(task.id)}
                        title="Delete Task"
                    >
                        &times;
                    </button>
                </div>
            </div>

            <div className="card-body">
                <h3>{task.title}</h3>
                <p>{task.description}</p>
            </div>

            <div className="card-footer">
                <label className="toggle-switch">
                    <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => onToggle(task.id)}
                    />
                    <span className="slider round"></span>
                </label>
                <span className="status-text">
                    {task.completed ? 'Done' : 'Pending'}
                </span>
            </div>
        </div>
    );
};

export default TaskItem;