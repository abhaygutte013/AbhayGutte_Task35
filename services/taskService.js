const Task = require("../models/Task");

// Add Task
const createTask = async (taskData) => {
    return await Task.create(taskData);
};

// Get All Tasks
const getAllTasks = async () => {
    return await Task.find();
};

// Get Task By ID
const getTaskById = async (id) => {
    return await Task.findById(id);
};

// Update Task
const updateTask = async (id, taskData) => {
    return await Task.findByIdAndUpdate(id, taskData, {
        new: true,
        runValidators: true
    });
};

// Delete Task
const deleteTask = async (id) => {
    return await Task.findByIdAndDelete(id);
};

// Search Tasks
const searchTasks = async (keyword) => {
    return await Task.find({
        title: { $regex: keyword, $options: "i" }
    });
};

// Update Status
const updateStatus = async (id, status) => {
    return await Task.findByIdAndUpdate(
        id,
        { status },
        { new: true }
    );
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