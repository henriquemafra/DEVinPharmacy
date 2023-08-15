import Dashboard  from './components/dashboard'

function App() {

  const customColors = {
    primary: {
      main: '#04005D', // Cor primária do aplicativo
    },
    secondary: {
      main: '#FA874C', // Cor secundária do aplicativo
    },
  };

  const customTheme = createTheme({
    palette: {
      ...customColors,
    },
  });

  return (
    <ThemeProvider theme={customTheme}>
      <LoginPage />
    </ThemeProvider>
  )
}

export default App
