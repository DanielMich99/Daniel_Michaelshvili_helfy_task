const express = require('express');
const router = express.Router();
const { body, matchedData } = require('express-validator');
const { handleValidationErrors } = require('../middleware/validationMiddleware');

/**
 * Task Routes
 * 
 * Handles all CRUD operations for tasks:
 * - GET    /        - Retrieve all tasks
 * - POST   /        - Create a new task
 * - PUT    /:id     - Update an existing task
 * - DELETE /:id     - Delete a task
 * - PATCH  /:id/toggle - Toggle task completion status
 */

// In-memory data store
let tasks = [];
let nextId = 1;


// GET / - Retrieve all tasks
router.get('/', (req, res) => {
    try {
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// POST / - Create a new task
router.post(
    '/',
    [
        body('title').isString().notEmpty().withMessage('Title is required').trim(),
        body('priority').optional().isIn(['low', 'medium', 'high']).withMessage('Priority must be low, medium or high'),
        body('description').optional().isString().trim()
    ],
    handleValidationErrors,
    (req, res) => {
        const validData = matchedData(req);
        const { title, description, priority } = validData;

        const newTask = {
            id: nextId++,
            title,
            description: description || '',
            completed: false,
            createdAt: new Date(),
            priority: priority || 'low'
        };

        tasks.push(newTask);
        res.status(201).json(newTask);
    }
);

// PUT /:id - Update a task
router.put(
    '/:id',
    [
        body('title').optional().isString().notEmpty().trim(),
        body('completed').optional().isBoolean(),
        body('priority').optional().isIn(['low', 'medium', 'high']),
        body('description').optional().isString().trim()
    ],
    handleValidationErrors,
    (req, res) => {
        const id = parseInt(req.params.id);
        const index = tasks.findIndex(t => t.id === id);

        if (index === -1) {
            return res.status(404).json({ error: 'Task not found' });
        }

        const validData = matchedData(req);

        tasks[index] = {
            ...tasks[index],
            ...validData,
            id
        };

        res.status(200).json(tasks[index]);
    }
);

// DELETE /:id - Delete a task
router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const initialLength = tasks.length;

    tasks = tasks.filter(t => t.id !== id);

    if (tasks.length === initialLength) {
        return res.status(404).json({ error: 'Task not found' });
    }

    res.status(204).send();
});

// PATCH /:id/toggle - Toggle task completion status
router.patch('/:id/toggle', (req, res) => {
    const id = parseInt(req.params.id);
    const task = tasks.find(t => t.id === id);

    if (!task) {
        return res.status(404).json({ error: 'Task not found' });
    }

    task.completed = !task.completed;
    res.status(200).json(task);
});

module.exports = router;