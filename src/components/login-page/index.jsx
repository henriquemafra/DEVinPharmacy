import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import { CssBaseline, Grid, Paper } from '@mui/material';
import Copyright from '../copyright';
import backgroundImg from '../../assets/img/LoginPageBg.png';
import ForgotPass from '../forgotPass';
import SignUp from '../login-page/SignUp'
import SignIn from '../login-page/SignIn'
import NotFoundPage from '../404';


export default function LoginPage() {

    return (
        <Grid container component="main" sx={{ height: '100vh' }}>
            <CssBaseline />
            {/* Background da página de login */}
            <Grid
                item
                xs={false}
                sm={8}
                md={7}
                sx={{
                    backgroundImage: `url(${backgroundImg})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '100% 100%',
                    backgroundPosition: 'center',
                }}
            />
            <Grid item xs={12} sm={4} md={4} component={Paper} elevation={24} square>
                <Routes>
                    {/* Rotas internas para as opções do menu*/}
                    <Route path="/" element={<SignIn />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/forgotpass" element={<ForgotPass />} />
                    <Route path='/*' element={<NotFoundPage />} />
                </Routes>
                <Grid item >
                    <Copyright />
                </Grid>
            </Grid>
            <Grid
                item
                xs={false}
                sm={6}
                md={1}
                sx={{
                    backgroundColor: '#04005D',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '100% 100%',
                    backgroundPosition: 'center',
                }}
            />
        </Grid>
    );
}
