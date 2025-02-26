// server.js
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users'); // These routes are protected by auth middleware
const errorHandler = require('./middleware/errorHandler');

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

app.use('/api/auth', authRoutes);   // Public routes
app.use('/api/users', userRoutes);  // Protected routes

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
