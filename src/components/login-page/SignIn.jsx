import React from "react";
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import { useState } from 'react';
import Grid from '@mui/material/Grid';
import logo from '../../assets/img/logo.png'

export default function SignIn({ }) {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    // Cria um estado para o alerta de erro na inserção do email ao formulário.
    const [errorAlert, setErrorAlert] = useState(false);
    // Cria um estado para o alerta de erro na inserção da senha ao formulário.
    const [errorAlertPassword, setErrorAlertPassword] = useState(false);

    // Atualiza do estado de FormData quando houver mudanças nos inputs Email e Senha.
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Obtem os dados armazenados no localStorage
        const storedUsers = JSON.parse(localStorage.getItem('users')) || [];

        // Verifica se há um usuário com o email inserido
        const user = storedUsers.find(user => user.email === formData.email);

        if (!user) {
            // Usuário não encontrado, exiba um alerta de erro
            setErrorAlert(true);
            setTimeout(() => {
                setErrorAlert(false);
            }, 10000);
        } else if (user.password !== formData.password) {
            // Senha incorreta, exibe um alerta de erro
            setErrorAlertPassword(true);
            setTimeout(() => {
                setErrorAlertPassword(false);
            }, 10000);
        } else {
            // Login bem-sucedido, redireciona para a página de destino
            window.location.href = '/dashboard';
        }
    };


    return (
        <Box
            sx={{
                mt: -3,
                mx: 6,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh', // Altura total da viewport
            }}
        >
            <img
                style={{ marginBottom: '10px' }}
                alt="Logo"
                src={logo}
                width="200"
                height="50"
            />
            <Typography sx={{ textAlign: "center" }} component="p">
                Insira seus dados de acesso
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                    error={errorAlert}
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    onChange={handleChange}
                />
                <TextField
                    error={errorAlertPassword}
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Senha"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={handleChange}
                />
                <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Lembrar-me"
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Entrar
                </Button>
                {errorAlert && (
                    <Alert variant="outlined" severity="error">Não encontramos uma conta com este email.</Alert>
                )}
                {errorAlertPassword && (
                    <Alert variant="outlined" severity="error" sx={{ mt: 1 }}>Senha incorreta. Sua senha deve ter no mínimo 8 caracteres, incluindo letras e números.</Alert>
                )}

                <Grid container>
                    <Grid item xs>
                        <Link href="/loginpage/forgotpass" variant="body2">
                            Esqueceu sua senha?
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link href="/loginpage/signup" variant="body2">
                            {"É novo por aqui? Cadastre-se!"}
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}