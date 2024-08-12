const notes = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const path = require("path");

const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require("../helpers/fsUtils.js");


// GET Route for retrieving all the notes
notes.get('/notes', (req, res) => {
    console.info(`${req.method} request received for notes`);
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

/*// GET Route for a specific note
notes.get('/notes/:note_id', (req, res) => {
  const noteId = req.params.note_id;
  readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      const result = json.filter((note) => note.note_id === noteId);
      return result.length > 0
        ? res.json(result)
        : res.json('No note with that ID');
    });
});
*/

// DELETE Route for note   
notes.delete('/notes/:id', (req, res) => {
  const noteId = req.params.id;
  readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      // Make a new array of all notes except the one with the ID provided in the URL
      const result = json.filter((note) => note.id !== noteId);

      // Save that array to the filesystem
      writeToFile('./db/db.json', result);

      // Respond to the DELETE request
      res.json(`${noteId} has been deleted 🗑️`);
    });
});


// POST Route for a new note
notes.post('/notes', (req, res) => {
  console.log(req.body);

  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };

    readAndAppend(newNote, './db/db.json');
    res.json(newNote                                                                              );
  } else {
    res.error('Error in adding note');
  }
  
});

module.exports = notes;


