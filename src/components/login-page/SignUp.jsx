import { React, useState, useEffect } from 'react';
import { Avatar, Button, CssBaseline, TextField, Link, Grid, Box, Typography, Container, Alert } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';


export default function SignUp() {


  // Cria um estado para o alerta de erro na inserção do email ao formulário.
  const [errorAlert, setErrorAlert] = useState(false);
  // Cria um estado para o alerta de erro na inserção da senha ao formulário.
  const [errorAlertPassword, setErrorAlertPassword] = useState(false);

  // Cria um estado para cada campo do formulário e um estado para controlar se o cadastro foi feito com sucesso.
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [supervisor, setSupervisor] = useState('');
  const [filial, setFilial] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);

  // Cria uma função para lidar com o envio do formulário.
const handleSubmit = (event) => {
  event.preventDefault();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email.match(emailPattern)) {
    setErrorAlert(true);
    setTimeout(() => {
      setErrorAlert(false);
    }, 10000);
  } else if (
    password.length < 8 ||
    !/(?=.*[a-zA-Z])/.test(password) ||
    !/(?=.*\d)/.test(password)
  ) {
    setErrorAlertPassword(true);
    setTimeout(() => {
      setErrorAlertPassword(false);
    }, 10000);
  } else {
    // Crie um objeto com os dados do novo usuário
    const newUser = {
      firstName,
      lastName,
      supervisor,
      filial,
      email,
      password
    };

    // Obtenha os dados armazenados no localStorage
    const storedData = JSON.parse(localStorage.getItem('users')) || [];

    // Adicione o novo usuário aos dados armazenados
    const updatedData = [...storedData, newUser];

    // Salve os dados atualizados no localStorage
    localStorage.setItem('users', JSON.stringify(updatedData));

    // Marque o cadastro como feito com sucesso
    setIsRegistered(true);
    const redirectTimeout = 5000;
    setTimeout(() => {
      window.location.href = '/';
    }, redirectTimeout);
  }
};

  // Inicia o contador em 10 segundos
  const [countdown, setCountdown] = useState(5);

  // Contador do alert para redirecionar a pagina de login
  useEffect(() => {
    if (isRegistered && countdown > 0) {
      const countdownInterval = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);

      return () => {
        clearInterval(countdownInterval);
      };
    }
  }, [isRegistered, countdown]);

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
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Cadastro
        </Typography>
        <Box component="form" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="Nome"
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Sobrenome"
                name="lastName"
                autoComplete="family-name"
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="supervisor"
                label="Nome do gestor"
                name="superviser"
                value={supervisor}
                onChange={(event) => setSupervisor(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="filial"
                label="Cidade/Estado"
                name="filial"
                value={filial}
                onChange={(event) => setFilial(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Senha"
                type="password"
                id="password"
                autoComplete="new-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            onClick={handleSubmit}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Cadastrar
          </Button>
          {errorAlert && (
                    <Alert variant="outlined" severity="error">Informe um email válido por favor.</Alert>
                )}
                {errorAlertPassword && (
                    <Alert variant="outlined" severity="error" sx={{ mt:1}}>Informe uma senha válida com no mínimo 8 caracteres incluindo letras e números.</Alert>
                )}
          {isRegistered && (
            <Alert variant="outlined" severity="success" sx={{ mt: 1 }}>
              Seu cadastro foi efetuado com sucesso. Você será redirecionado para página de login em {countdown} segundos.
            </Alert>
          )}
          <Grid container justifyContent="flex-end">
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