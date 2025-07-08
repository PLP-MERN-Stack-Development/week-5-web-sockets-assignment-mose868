import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';
import Login from './components/Login';
import Chat from './components/Chat';
import { useSocket } from './socket/socket';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#f48fb1',
    },
  },
});

function App() {
  const [username, setUsername] = useState('');
  const { connect, disconnect, isConnected } = useSocket();

  const handleLogin = (name) => {
    setUsername(name);
    connect(name);
  };

  const handleLogout = () => {
    disconnect();
    setUsername('');
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              !username ? (
                <Login onLogin={handleLogin} />
              ) : (
                <Navigate to="/chat" replace />
              )
            }
          />
          <Route
            path="/chat"
            element={
              username ? (
                <Chat username={username} onLogout={handleLogout} />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App; 