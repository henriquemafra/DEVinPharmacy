import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Copyright from '../copyright';
import backgroundImg from '../../assets/img/LoginPageBg.png';
import LogIn from './login';

// Usa UseState para criar um estado aos campos do form
export default function LoginPage() {
    

    return (
        <Grid container component="main" sx={{ height: '100vh' }}>
            <CssBaseline />
            {/* Background da página de login */}
            <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                    backgroundImage: `url(${backgroundImg})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '100% 100%',
                    backgroundPosition: 'center',
                }}
            />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={24} square>
            <LogIn/>
                <Copyright sx={{
                    mt: 5
                }} />
            </Grid>
        </Grid>
    );
}