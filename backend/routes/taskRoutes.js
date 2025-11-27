const express = require('express');
const router = express.Router();
const {createTask, getAllTasks, updateTask, deleteTask} = require('../controllers/taskController');
const {verifyToken, verifyAdmin} = require('../middleware/authMiddleware');


router.use(verifyToken);

// Route to get all tasks with pagination
router.get('/', getAllTasks);
// Route to create a new task
router.post('/', createTask);
// Route to update a task
router.put('/:id', updateTask);


// Route to delete a task (admin only)
router.delete('/:id', verifyAdmin, deleteTask);


module.exports = router;