import React, {useContext} from "react";
import { AppBar, Toolbar, Typography, IconButton, Button, Box } from '@mui/material';
import {Brightness4, Brightness7} from '@mui/icons-material';
import { useTheme } from "@mui/material/styles";
import { AuthContext, ColorModeContext } from '../App';
import { useNavigate } from 'react-router-dom';


const Navbar = () => {
    const theme = useTheme();
    const colorMode = useContext(ColorModeContext);
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();


    
    
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1, cursor: 'pointer' }} onClick={() => navigate('/')}>
                    Task Management
                </Typography>
                <IconButton sx={{ ml: 1 }} color="inherit" onClick={colorMode.toggleColorMode}>
                    {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
                </IconButton>
                {user ? (
                    <>
                    
                        <Typography sx={{ mx: 2 }}>
                            {user.username}
                        </Typography>
                        <Button color="error" onClick={logout}>
                            Logout
                        </Button>
                    </>
                ) : (
                    <>
                    <Button color="inherit" onClick={() => navigate('/login')}>
                        Login
                    </Button>
                    <Button color="inherit" onClick={() => navigate('/register')}>Sign Up</Button>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
};


export default Navbar;