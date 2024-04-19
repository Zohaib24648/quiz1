const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 3001;  // Directly defined
const MONGO_URI = 'mongodb://localhost:27017/quiz1';  // Directly defined
const JWT_SECRET = 'ZohaibMughal';  // Directly defined, used for JWT

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connecting to MongoDB without deprecated options
mongoose.connect(MONGO_URI)
.then(() => {
    console.log(`Connected to the Database at ${MONGO_URI}`);
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
})
.catch((err) => {
    console.error('Not Connected to the Database:', err);
});

// Import routes
const userRoutes = require('./routes/users');
const recipeRoutes = require('./routes/recipes');

// Routes
app.use('/api/users', userRoutes);
app.use('/api/recipes', recipeRoutes);

// Error handling for non-existent routes
app.use((req, res, next) => {
    res.status(404).send('Endpoint not found');
});

// General error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Server error');
});
