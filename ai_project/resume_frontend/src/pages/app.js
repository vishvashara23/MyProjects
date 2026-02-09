const express = require('express');
const cors = require('cors');
const app = express();

// Add this before your routes
// This allows requests from your React app's origin
app.use(cors({
  origin: 'http://localhost:5173' // Replace with your frontend's actual URL
}));

// ... rest of your server setup and routes
// For example:
// app.use('/api/auth', authRoutes);

app.listen(8080, () => console.log('Server running on port 8080'));