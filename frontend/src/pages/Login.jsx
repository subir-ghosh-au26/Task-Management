import React, { useState, useContext } from 'react';
import { Container, Paper, TextField, Button, Typography, Box } from '@mui/material';
import axios from 'axios';
import { AuthContext } from '../App';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://task-management-rrli.onrender.com/auth/login', formData);
      login({ username: res.data.username, role: res.data.role }, res.data.token);
      navigate('/');
    } catch (err) { alert('Invalid Credentials'); }
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ p: 4, mt: 8, textAlign: 'center' }}>
        <Typography variant="h5" mb={3}>Sign In</Typography>
        <form onSubmit={handleSubmit}>
          <TextField 
            fullWidth label="Username" margin="normal" 
            onChange={(e) => setFormData({...formData, username: e.target.value})} 
          />
          <TextField 
            fullWidth type="password" label="Password" margin="normal" 
            onChange={(e) => setFormData({...formData, password: e.target.value})} 
          />
          <Box mt={2}>
            <Button fullWidth variant="contained" type="submit" size="large">Login</Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;