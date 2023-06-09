// Dependancies
const express = require('express');
const path = require('path');
const api = require('./routes/index.js');

// Constants
const PORT = process.env.PORT || 3001;
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/api', api);

// Route to index.html
app.get('/', (request, response) => response.sendFile(path.join(__dirname, '/public/index.html')));

// Route to notes.html
app.get('/notes', (request, response) => response.sendFile(path.join(__dirname, '/public/notes.html')));

// Route to Default
app.get('*', (request, response) => response.sendFile(path.join(__dirname, '/public/index.html')));

// Find a listener
app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT} 🚀`));