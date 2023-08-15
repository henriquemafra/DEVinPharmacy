import LoginPage from './components/login-page';
import { createTheme, ThemeProvider } from '@mui/material/styles';


function App() {

  const customColors = {
    primary: {
      main: '#3750F0', // Cor primária do aplicativo
    },
    secondary: {
      main: '#000000', // Cor secundária do aplicativo
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
