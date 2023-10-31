import express from 'express';
const router = express.Router();
const { addNote, getNotes, deleteNote, updateNote } = require('../controller/notesController'); // Import the updateNote function

router.route('/').post(addNote).get(getNotes);
router.route('/:noteId').delete(deleteNote);
router.route('/:noteId').put(updateNote); // Add the PUT route for updating a note

module.exports = router;
