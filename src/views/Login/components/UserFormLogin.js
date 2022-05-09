import React from "react";
import { useDispatch } from "react-redux";
import { initSessionAction } from "../../../store/UserReducers";
import {Link as LinkDom} from 'react-router-dom'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

export default function LoginForm({showAlert}){
    const dispatch = useDispatch();
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
        let userForm = document.getElementById('email').value;
        let passwordForm = document.getElementById('password').value;

        dispatch(initSessionAction(userForm, passwordForm));
    };

    return (
        <ThemeProvider theme={theme}>
          <Grid id="loginMainGrid" container component="main">
            <CssBaseline />
            <Grid id="backgroundImgGrid" item sm={4} md={7} />
            <Grid id="formGrid" item md={5} component={Paper} elevation={6}>
              <Box id="avatarBox">
                <Avatar id="avatarFormBox">
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign in
                </Typography>
                <Box id="formComponentBox" component="form" noValidate onSubmit={handleSubmit}>
                  <TextField margin="normal" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" autoFocus />
                  <TextField margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password" />
                  <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
                  <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}> Sign In </Button>
                  <Grid container>
                    <Grid item xs>
                      <Link as={LinkDom} to="/" variant="body2">
                        Forgot password?
                      </Link>
                    </Grid>
                    <Grid item>
                      <Link as={LinkDom} to="/register" variant="body2">
                        {"Don't have an account? Sign Up"}
                      </Link>
                    </Grid>
                  </Grid>
                  <Copyright id="copyrightFunction"/>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </ThemeProvider>
      );
}