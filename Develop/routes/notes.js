// Dependancies
const notes = require('express').Router();
const { readFromFile, writeToFile, readAndAppend} = require('../public/assets/js/fsUtils');
const uuid = require('../public/assets/js/uuid');
const db = require('../db/db.json');

// Create
notes.post('/', (request, response) => {
    const { title, text } = request.body;

    if (request.body) {
        const newNote = { title, text, id: uuid() };
        readAndAppend(newNote, './db/db.json');
        response.json('Note added successfuly 🚀');
    } else {
        response.errored('Error adding note!');
    } 
});

// Read
notes.get('/', (request, response) => readFromFile('./db/db.json').then((data) => response.json(JSON.parse(data))));

// Upate

// Delete
notes.delete('/:id', (request, response) => {
    const newDB = db.filter((note) => note.id !== request.params.id);
    writeToFile('./db/db.json', newDB);
    response.json(newDB);
});

// Export
module.exports = notes;