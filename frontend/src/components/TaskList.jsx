import React, { useState, useEffect, useRef } from 'react';
import TaskItem from './TaskItem';
import '../styles/TaskList.css';

/**
 * TaskList Component
 * 
 * Displays a collection of tasks in either static centered layout or animated carousel mode.
 * Automatically detects overflow and switches to infinite scroll animation when content
 * exceeds container width. Uses task duplication for seamless infinite loop effect.
 * 
 * @param {array} tasks - Array of task objects to display
 * @param {function} onDelete - Callback function to handle task deletion
 * @param {function} onToggle - Callback function to toggle task completion
 * @param {function} onEdit - Callback function to handle task updates
 */
const TaskList = ({ tasks, onDelete, onToggle, onEdit }) => {
    const containerRef = useRef(null);
    const [isOverflowing, setIsOverflowing] = useState(false);

    // Constants for width calculations (must match CSS values)
    const CARD_WIDTH = 280;
    const GAP = 20;

    /**
     * Checks if the task list content overflows the container width
     * Triggers animation mode when overflow is detected
     */
    useEffect(() => {
        const checkOverflow = () => {
            if (containerRef.current) {
                const containerWidth = containerRef.current.offsetWidth;
                const contentWidth = tasks.length * (CARD_WIDTH + GAP);

                // Enable animation if content is wider than container
                setIsOverflowing(contentWidth > containerWidth);
            }
        };

        // Initial check on mount
        checkOverflow();

        // Recheck on window resize
        window.addEventListener('resize', checkOverflow);
        return () => window.removeEventListener('resize', checkOverflow);
    }, [tasks]); // Re-run when tasks array changes

    // Display empty state message when no tasks are available
    if (!tasks || tasks.length === 0) {
        return <div className="empty-state">No tasks available. Add some!</div>;
    }

    // MODE 1: Static centered layout (no overflow detected)
    // Tasks are displayed in a centered flex container without animation
    if (!isOverflowing) {
        return (
            <div className="carousel-container static" ref={containerRef}>
                <div className="carousel-track static-track">
                    {tasks.map((task) => (
                        <TaskItem
                            key={task.id}
                            task={task}
                            onDelete={onDelete}
                            onToggle={onToggle}
                            onEdit={onEdit}
                        />
                    ))}
                </div>
            </div>
        );
    }

    // MODE 2: Animated carousel (overflow detected)
    // Duplicate tasks array 3x to create seamless infinite scroll loop effect
    // When the first third completes, animation resets to start, creating continuous motion
    const duplicatedTasks = [...tasks, ...tasks, ...tasks];

    return (
        <div className="carousel-container" ref={containerRef}>
            <div
                className="carousel-track animating"
                style={{
                    // Dynamic animation duration based on number of tasks
                    // More tasks = slower speed for better readability
                    animationDuration: `${tasks.length * 3}s`
                }}
            >
                {duplicatedTasks.map((task, index) => (
                    <TaskItem
                        key={`${task.id}-${index}`}
                        task={task}
                        onDelete={onDelete}
                        onToggle={onToggle}
                        onEdit={onEdit}
                    />
                ))}
            </div>
        </div>
    );
};

export default TaskList;