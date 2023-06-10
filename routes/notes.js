// Dependancies
const notes = require('express').Router();
const { readFromFile, writeToFile, readAndAppend} = require('../utils/fsUtils');
const uuid = require('../utils/uuid');
const db = require('../db/db.json');

const fs = require('fs');

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

// Update

// Delete


/*
Issue localized to before write, newDB is correctly written
Issue also does not have to do with repeat IDs or reruns,
The log only shows 1 id ever used at any time
Issue must be with filter or other similar issue.

If db prints, newDB prints as object object and switches notes
If db does not print, newDB prints normally and deletes many or all

db is printing as only 2 or so notes when there are 4, unknown why


PROBLEM: db IS READING PREVIOUS DATA, ISSUE IS NOT WITH SAVE
FIX READ FUNCTION AND THE PROBLEM IS SOLVED
ALL OTHER COMPONENTS WORK AS INTENDED
*/

// SOLUTION: REPLACE db WITH A VARIABLE THAT RUNS A READ FUNCTION AT THE START, THIS FIXES ALL ISSUES.

// Issue solved, remove comments at your own convenience

notes.delete('/:id', (request, response) => {
    
    // Reads file each time this is run.
    const dbRead = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'));
    //console.log("FIRST DB: " + JSON.stringify(dbRead));
    //console.log("ID: " + request.params.id);

    const newDB = dbRead.filter((note) => note.id !== request.params.id);
    //console.log("NEW DATABASE: " + JSON.stringify(newDB));
    
    writeToFile('./db/db.json', newDB);
    response.json(newDB);
});

// Export
module.exports = notes;