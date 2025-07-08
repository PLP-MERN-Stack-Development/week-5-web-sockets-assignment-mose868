import { useState, useEffect, useRef } from 'react';
import {
  Box,
  Paper,
  TextField,
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemText,
  AppBar,
  Toolbar,
  Button,
  Chip,
} from '@mui/material';
import { Send as SendIcon, ExitToApp as LogoutIcon } from '@mui/icons-material';
import { formatDistanceToNow } from 'date-fns';
import { useSocket } from '../socket/socket';

function Chat({ username, onLogout }) {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messageEndRef = useRef(null);
  const {
    messages,
    users,
    typingUsers,
    sendMessage,
    setTyping,
    isConnected,
  } = useSocket();

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle typing indicator
  useEffect(() => {
    let typingTimeout;
    if (isTyping) {
      setTyping(true);
      typingTimeout = setTimeout(() => {
        setIsTyping(false);
        setTyping(false);
      }, 2000);
    }
    return () => clearTimeout(typingTimeout);
  }, [isTyping, setTyping]);

  const handleSend = (e) => {
    e.preventDefault();
    if (message.trim()) {
      sendMessage(message.trim());
      setMessage('');
      setIsTyping(false);
      setTyping(false);
    }
  };

  const handleTyping = (e) => {
    setMessage(e.target.value);
    if (!isTyping) {
      setIsTyping(true);
    }
  };

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Chat Room
          </Typography>
          <Chip
            label={isConnected ? 'Connected' : 'Disconnected'}
            color={isConnected ? 'success' : 'error'}
            size="small"
            sx={{ mr: 2 }}
          />
          <Typography variant="body2" sx={{ mr: 2 }}>
            Online Users: {users.length}
          </Typography>
          <Button color="inherit" onClick={onLogout} startIcon={<LogoutIcon />}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Paper
        sx={{
          flex: 1,
          overflow: 'auto',
          p: 2,
          backgroundColor: 'background.default',
        }}
      >
        <List>
          {messages.map((msg) => (
            <ListItem
              key={msg.id}
              sx={{
                flexDirection: 'column',
                alignItems: msg.sender === username ? 'flex-end' : 'flex-start',
              }}
            >
              <Box
                sx={{
                  maxWidth: '70%',
                  backgroundColor: msg.sender === username ? 'primary.main' : 'grey.700',
                  borderRadius: 2,
                  p: 1,
                }}
              >
                {!msg.system && (
                  <Typography variant="caption" color="text.secondary">
                    {msg.sender}
                  </Typography>
                )}
                <Typography variant="body1">{msg.message}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {formatDistanceToNow(new Date(msg.timestamp), { addSuffix: true })}
                </Typography>
              </Box>
            </ListItem>
          ))}
          <div ref={messageEndRef} />
        </List>
        {typingUsers.length > 0 && (
          <Typography variant="caption" color="text.secondary">
            {typingUsers.join(', ')} {typingUsers.length === 1 ? 'is' : 'are'} typing...
          </Typography>
        )}
      </Paper>

      <Paper
        component="form"
        onSubmit={handleSend}
        sx={{
          p: 2,
          display: 'flex',
          gap: 1,
          backgroundColor: 'background.paper',
        }}
      >
        <TextField
          fullWidth
          placeholder="Type a message..."
          value={message}
          onChange={handleTyping}
          variant="outlined"
          size="small"
        />
        <IconButton type="submit" color="primary" disabled={!message.trim()}>
          <SendIcon />
        </IconButton>
      </Paper>
    </Box>
  );
}

export default Chat; 