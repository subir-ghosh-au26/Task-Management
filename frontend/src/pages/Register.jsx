import React, { useState } from 'react';
import { 
  Container, 
  Paper, 
  TextField, 
  Button, 
  Typography, 
  Box, 
  Alert, 
  MenuItem, 
  Select, 
  FormControl, 
  InputLabel 
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();
  
  // State for form data
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: 'user'
  });

  // State for error handling
  const [error, setError] = useState('');

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

     const { username, password } = formData;
    
    // Check Length
    if (username.length < 3) {
      setError("Username must be at least 3 characters long.");
      return;
    }

    // Check for Spaces
    if (/\s/.test(username)) {
      setError("Username cannot contain spaces.");
      return; 
    }
    
    try {
      
      await axios.post('http://localhost:5000/auth/register', formData);
      
      alert('Registration successful! Please login.');
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ p: 4, mt: 8, borderRadius: 2 }}>
        <Typography variant="h5" component="h1" align="center" gutterBottom fontWeight="bold">
          Create Account
        </Typography>
        
        <Typography variant="body2" align="center" color="text.secondary" mb={3}>
          Join to manage your tasks efficiently
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Username"
            name="username"
            variant="outlined"
            margin="normal"
            value={formData.username}
            onChange={handleChange}
            required
          />

          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            variant="outlined"
            margin="normal"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <FormControl fullWidth margin="normal">
            <InputLabel id="role-label">Select Role</InputLabel>
            <Select
              labelId="role-label"
              name="role"
              value={formData.role}
              label="Select Role"
              onChange={handleChange}
            >
              <MenuItem value="user">User</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </Select>
          </FormControl>

          <Button 
            fullWidth 
            variant="contained" 
            color="primary" 
            type="submit" 
            size="large"
            sx={{ mt: 3, mb: 2, py: 1.5, fontWeight: 'bold' }}
          >
            Sign Up
          </Button>

          <Box textAlign="center">
            <Button 
              color="secondary" 
              onClick={() => navigate('/login')}
              sx={{ textTransform: 'none' }}
            >
              Already have an account? Sign In
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default Register;