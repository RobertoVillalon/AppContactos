import React from "react";
import {Link as LinkDom} from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

export default function RegisterForm ({handleSubmitRegister}){
    const theme = createTheme();
    
    function Copyright(props) {
        return (
          <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit">
              ContactAPP
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
          </Typography>
        );
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let nombre = document.getElementById("username").value;
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;
        let confirmPassword = document.getElementById("confirmPassword").value;

        if(password !== confirmPassword){
            alert("Las contraseñas no son correctas");
        }else{
            handleSubmitRegister(nombre, email, password);
        }

    }

    return (
        <ThemeProvider theme={theme}>
          <Grid container component="main" sx={{ height: '100vh' }}>
            <CssBaseline />
            <Grid item id="gridBackgroundImg" xs={false} sm={4} md={7} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
              <Box
                sx={{
                  my: 8,
                  mx: 4,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign up
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                  <TextField margin="normal" required fullWidth id="username"label="Username"name="username" autoFocus/>
                  <TextField margin="normal" required fullWidth id="email" label="Email Address" name="email" autoFocus />
                  <TextField margin="normal" required fullWidth name="password" label="Password" type="password" id="password" />
                  <TextField margin="normal" required fullWidth name="confirmPassword" label="Confirm Password" type="password" id="confirmPassword"/>
                  <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}> Sign up </Button>
                  <Grid>
                      <Link as={LinkDom} to="/login" variant="body2">
                        {"You have an account? Sign In"}
                      </Link>
                  </Grid>
                  <Copyright sx={{ mt: 5 }} />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </ThemeProvider>
      );
}