import React from 'react';
import '../styles/TaskFilter.css';

/**
 * TaskFilter Component
 * 
 * Displays filter buttons to toggle between different task views (All, Pending, Completed).
 * 
 * @param {string} currentFilter - The currently active filter of the task list 
 * @param {function} onFilterChange - Callback function to handle filter changes
 */
const TaskFilter = ({ currentFilter, onFilterChange }) => {
    const filters = ['All', 'Pending', 'Completed'];

    return (
        <div className="filter-container">
            {filters.map((filter) => (
                <button
                    key={filter}
                    className={`filter-btn ${currentFilter === filter ? 'active' : ''}`}
                    onClick={() => onFilterChange(filter)}
                >
                    {filter}
                </button>
            ))}
        </div>
    );
};

export default TaskFilter;