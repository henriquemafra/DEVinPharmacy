import Dashboard from './components/dashboard';
import LoginPage from './components/login-page';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

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
    typography: {
      subtitle1: {
        fontSize: 17,
      },
    },
  });


  return (
    <ThemeProvider theme={customTheme}>
      <Router>
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path='/dashboard/*' element={<Dashboard />} />        
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
