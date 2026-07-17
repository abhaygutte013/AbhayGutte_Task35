const taskService = require("../services/taskService");

// Add Task
const createTask = async (req, res) => {
    try {
        const task = await taskService.createTask(req.body);

        res.status(201).json({
            success: true,
            message: "Task created successfully",
            data: task
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get All Tasks
const getAllTasks = async (req, res) => {
    try {
        const tasks = await taskService.getAllTasks();

        res.status(200).json({
            success: true,
            data: tasks
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get Task By ID
const getTaskById = async (req, res) => {
    try {
        const task = await taskService.getTaskById(req.params.id);

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        res.status(200).json({
            success: true,
            data: task
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Update Task
const updateTask = async (req, res) => {
    try {
        const task = await taskService.updateTask(req.params.id, req.body);

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Task updated successfully",
            data: task
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Delete Task
const deleteTask = async (req, res) => {
    try {
        const task = await taskService.deleteTask(req.params.id);

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Task deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Search Tasks
const searchTasks = async (req, res) => {
    try {
        const tasks = await taskService.searchTasks(req.query.keyword);

        res.status(200).json({
            success: true,
            data: tasks
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Update Status
const updateStatus = async (req, res) => {
    try {
        const task = await taskService.updateStatus(
            req.params.id,
            req.body.status
        );

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Status updated successfully",
            data: task
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask,
    searchTasks,
    updateStatus
};