const express = require('express');
const cors = require('cors');
const tasksRoutes = require('./routes/tasks');

const app = express();
const PORT = 4000;

// Global Middleware
app.use(cors());
app.use(express.json());

// Routes Connection
app.use('/api/tasks', tasksRoutes);

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});