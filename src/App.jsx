import './App.css'

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
    </ThemeProvider>
  )
}

export default App
