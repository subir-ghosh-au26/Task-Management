const Task = require('../model/Task');

// Create a new task
exports.createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const newTask = new Task({ title, description, status });
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Get all tasks
exports.getAllTasks = async (req, res) => {
    const { page = 1, limit = 5 } = req.query;
  try {
    
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);

    const tasks = await Task.find()
      .limit(limitNum)
      .skip((pageNum - 1) * limitNum)
      .sort({ createdAt: -1 });

    const count = await Task.countDocuments();

    res.json({
      tasks,
      totalPages: Math.ceil(count / limitNum),
      currentPage: pageNum,
      totalTasks: count
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Update Task

exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    
    const updatedTask = await Task.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(updatedTask);

  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Delete Task
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};
