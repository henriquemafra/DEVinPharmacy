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

// Passando toggleComponent como prop para fazer a alteração entre signup e signin
export default function SignIn({toggleComponent}) {

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

    // Realizar a validação dos campos do formulário e definir a ação a ser tomada após o envio.
    const handleSubmit = (event) => {
        event.preventDefault();
        //Expressão regular para definir o padrão de email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!formData.email.match(emailPattern)) {
            setErrorAlert(true);
            setTimeout(() => {
                setErrorAlert(false);
            }, 10000); // Utiliza função setTimeout para ocultar o alerta após 10 segundos
        } else if (
            formData.password.length < 8 || // Verifica se a senha tem pelo menos 8 caracteres
            !/(?=.*[a-zA-Z])/.test(formData.password) || // Verifica se a senha contém pelo menos uma letra
            !/(?=.*\d)/.test(formData.password) // Verifica se a senha contém pelo menos um número
        ) {
            setErrorAlertPassword(true);
            setTimeout(() => {
                setErrorAlertPassword(false);
            }, 10000); // Utiliza função setTimeout para ocultar o alerta após 10 segundos
        } else {
            // Redirecionar para a página de Mapa
            window.location.href = '/dashboard'; // Lembrar de inserir o endereço da página mapa
        }
    };
    return (
        <Box
            sx={{
                mt: -3,
                mx: 4,
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
                src="src\assets\img\logo.png"
                width="300"
                height="70"
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
                    <Alert variant="outlined" severity="error">Ops! Informe um email válido por favor.</Alert>
                )}
                {errorAlertPassword && (
                    <Alert variant="outlined" severity="error">Ops! Informe uma senha válida com no mínimo 8 caracteres incluindo letras e números.</Alert>
                )}

                <Grid container>
                    <Grid item xs>
                        <Link href="#" variant="body2">
                            Esqueceu sua senha?
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link href="#" onClick={toggleComponent} variant="body2">
                            {"É novo por aqui? Cadastre-se!"}
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}