# Real-Time Chat Application

A real-time chat application built with React, Socket.io, and Express.

## Features

- Real-time messaging
- User authentication (username-based)
- Typing indicators
- Online/offline status
- Message timestamps
- System notifications for user join/leave events
- Responsive design

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Project Structure

```
.
├── client/             # React frontend
│   ├── src/
│   │   ├── components/
│   │   └── socket/
│   └── package.json
└── server/            # Express backend
    └── server.js
```

## Setup Instructions

1. Clone the repository
2. Install dependencies:

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

3. Create environment files:

```bash
# In client directory
echo "VITE_SOCKET_URL=http://localhost:5000" > .env
```

4. Start the development servers:

```bash
# Start the server (from server directory)
npm start

# Start the client (from client directory)
npm run dev
```

5. Open your browser and navigate to `http://localhost:5173`

## Environment Variables

### Client
- `VITE_SOCKET_URL`: URL of the Socket.io server (default: http://localhost:5000)

### Server
- `PORT`: Server port (default: 5000)
- `CLIENT_URL`: Client URL for CORS (default: http://localhost:5173)

## Available Scripts

### Client
- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build

### Server
- `npm start`: Start the server

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request 