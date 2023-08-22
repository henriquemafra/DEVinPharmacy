import { React, useState } from 'react';
import { Avatar, Button, CssBaseline, TextField, Link, Grid, Box, Typography, Container, Alert } from '@mui/material';
import LockResetIcon from '@mui/icons-material/LockReset';

export default function ForgotPass() {

  const [formData, setFormData] = useState({
    email: '',
  });

  // Cria um estado para o alerta de erro na inserção do email ao formulário.
  const [errorAlert, setErrorAlert] = useState(false);
  // Cria um estado para o alerta de Sucesso no envio do email.
  const [errorAlertSuccess, setErrorAlertSuccess] = useState(false);

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
        setErrorAlert(false); setErrorAlertSuccess(true)
      }, 10000); // Utiliza função setTimeout para ocultar o alerta após 10 segundos
    } else {
      setErrorAlertSuccess(true);
      setTimeout(() => {
        setErrorAlertSuccess(false);
      }, 10000); // Utiliza função setTimeout para ocultar o alerta após 10 segundos
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          mt: -3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh', // Altura total da viewport
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          <LockResetIcon />
        </Avatar>
        <Typography component="h1" variant="h5" >
          Redefinir Senha
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 5 }}>
          <Grid container spacing={2}>
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              onChange={handleChange}
            />
          </Grid>
          <Typography variant='p' color='text.secondary' sx={{ fontSize: '14px', width: '500px' }}>
            Digite seu e-mail. Se houver uma conta registrada com este endereço, você receberá um e-mail com instruções para redefinir sua senha.
          </Typography>
          <Button
            onClick={handleSubmit}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Redefinir
          </Button>
          {errorAlert && (
            <Alert variant="outlined" severity="error">Informe um email válido por favor.</Alert>
          )}
          {errorAlertSuccess && (
            <Alert variant="outlined" severity="success" sx={{ mt: 1 }}>Um email com instruções foi enviado para {formData.email}. Siga as instruções para redefinir sua senha.</Alert>
          )}
          <Grid container justifyContent="flex-end" sx={{ mt: 1 }}>
            <Grid item>
              <Link href="/" variant="body2">
                Já possuí uma conta? Entre.
              </Link>
            </Grid>

          </Grid>
        </Box>
      </Box>
    </Container>
  );
}