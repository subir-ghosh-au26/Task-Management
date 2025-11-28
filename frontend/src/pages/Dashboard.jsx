import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { 
  Container, Grid, Card, CardContent, Typography, Button, Chip, 
  IconButton, Pagination, Box, Dialog, TextField, 
  DialogActions, DialogContent, DialogTitle, MenuItem 
} from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';
import { AuthContext } from '../App';

const API_URL = 'http://localhost:5000';

const Dashboard = () => {
  const { user, token } = useContext(AuthContext);
  
  const [tasks, setTasks] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  // Modal State
  const [open, setOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState({ title: '', description: '', status: 'Pending' });
  const [isEdit, setIsEdit] = useState(false);

  const fetchTasks = async () => {
    if(!token) return;
    try {
      const res = await axios.get(`${API_URL}/tasks?page=${page}&limit=6`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(res.data.tasks);
      setTotalPages(res.data.totalPages);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchTasks(); }, [page, token]);

  const handleDelete = async (id) => {
    if(!window.confirm("Are you sure?")) return;
    try {
      await axios.delete(`${API_URL}/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchTasks();
    } catch (err) { alert('Failed to delete'); }
  };

  const handleSave = async () => {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    try {
      if (isEdit) {
        await axios.put(`${API_URL}/tasks/${currentTask._id}`, currentTask, config);
      } else {
        await axios.post(`${API_URL}/tasks`, currentTask, config);
      }
      setOpen(false);
      fetchTasks();
    } catch (err) { alert('Error saving task'); }
  };

  const openModal = (task = { title: '', description: '', status: 'Pending' }, edit = false) => {
    setCurrentTask(task);
    setIsEdit(edit);
    setOpen(true);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4, minHeight: '80vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" fontWeight="800" color="primary">
          My Tasks
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<Add />} 
          onClick={() => openModal()}
          sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 'bold' }}
        >
          New Task
        </Button>
      </Box>

      {/* Content Area */}
      <Box sx={{ flexGrow: 1 }}>
        {tasks.length === 0 ? (
          <Typography color="text.secondary" align="center" mt={4}>
            No tasks found. Create one!
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {tasks.map((task) => (
              <Grid item xs={12} sm={6} md={4} key={task._id}>
                <Card 
                  elevation={0} 
                  sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 3,
                  }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box display="flex" justifyContent="space-between" mb={2}>
                      <Chip 
                        label={task.status} 
                        color={task.status === 'Completed' ? 'success' : 'warning'} 
                        size="small" 
                        variant="outlined" 
                      />
                      <Typography variant="caption" color="text.secondary">
                        {new Date(task.createdAt).toLocaleDateString()}
                      </Typography>
                    </Box>
                    
                    <Typography variant="h6" fontWeight="bold" noWrap gutterBottom>
                      {task.title}
                    </Typography>
                    
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                      sx={{ 
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        minHeight: '4.5em' 
                      }}
                    >
                      {task.description}
                    </Typography>
                  </CardContent>
                  
                  <Box p={2} pt={0} display="flex" justifyContent="flex-end" gap={1}>
                    <IconButton size="small" onClick={() => openModal(task, true)}>
                      <Edit fontSize="small" />
                    </IconButton>
                    {user && (user.role === 'admin' || user.role === 'Admin') && (
                      <IconButton size="small" color="error" onClick={() => handleDelete(task._id)}>
                        <Delete fontSize="small" />
                      </IconButton>
                    )}
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>

      {/* Pagination */}
      <Box display="flex" justifyContent="center" mt={4}>
        <Pagination 
          count={totalPages} 
          page={page} 
          onChange={(e, val) => setPage(val)} 
          color="primary" 
          size="large"
        />
      </Box>

      {/* Modal Dialog code... (Keep as is) */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>{isEdit ? 'Edit Task' : 'Add New Task'}</DialogTitle>
        <DialogContent>
          <TextField 
            margin="dense" label="Title" fullWidth 
            value={currentTask.title} 
            onChange={(e) => setCurrentTask({...currentTask, title: e.target.value})} 
          />
          <TextField 
            margin="dense" label="Description" fullWidth multiline rows={3}
            value={currentTask.description} 
            onChange={(e) => setCurrentTask({...currentTask, description: e.target.value})} 
          />
          <TextField
            select margin="dense" label="Status" fullWidth
            value={currentTask.status}
            onChange={(e) => setCurrentTask({...currentTask, status: e.target.value})}
          >
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Dashboard;