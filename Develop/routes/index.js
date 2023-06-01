// Dependancies
const express = require('express');
const notesRouter = require('./notes');

// Constants
const app = express();

// Notes router
app.use('/notes', notesRouter);
app.use('/notes/:id', notesRouter);

// Export
module.exports = app;