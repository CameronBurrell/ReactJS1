import React from 'react';
import Site from './components/Site';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import {
  BrowserRouter as Router,
} from 'react-router-dom';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App () {
  const [darkMode, setDarkMode] = React.useState(false);
  return (
    <>
    { darkMode
      ? <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router>
        <Site darkMode={darkMode} setDarkMode={setDarkMode}/>
      </Router>
    </ThemeProvider>
      : <Router>
      <Site darkMode={darkMode} setDarkMode={setDarkMode}/>
    </Router>
    }
    </>
  );
}

export default App;
