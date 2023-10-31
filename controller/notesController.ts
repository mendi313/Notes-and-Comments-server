import { Request, Response } from 'express';
import { validationResult, body } from 'express-validator';
import NotesSchema from '../models/NotesSchema';
import CommentsSchema from '../models/CommentsSchema';

async function getNotes(req: Request, res: Response) {
  try {
    const notes = await NotesSchema.find();
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch notes' });
  }
}

async function addNote(req: Request, res: Response) {
  const validations = [body('title').isString().isLength({ min: 2, max: 100 }).withMessage('Title must be a string between 2 and 100 characters')];

  // Check for validation errors
  await Promise.all(validations.map((validation) => validation.run(req)));

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // If there are no validation errors, proceed to create the note
  const { title } = req.body;

  try {
    const newNote = new NotesSchema({
      title,
    });

    const savedNote = await newNote.save();
    const notes = await NotesSchema.find();
    return res.status(201).json(notes);
  } catch (error) {
    console.error('Error creating a new note:', error);
    return res.status(500).json({ error: 'Failed to create a new note' });
  }
}

async function deleteNote(req: Request, res: Response) {
  try {
    const noteId = req.params.noteId;

    // Check if the note exists
    const note = await NotesSchema.findById(noteId);
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    // Delete the associated comments
    await CommentsSchema.deleteMany({ note_id: noteId });

    // Delete the note
    await NotesSchema.findByIdAndDelete(noteId);

    return res.status(200).json({ message: 'Note and associated comments deleted successfully' });
  } catch (error) {
    console.error('Error deleting the note and comments:', error);
    return res.status(500).json({ error: 'Failed to delete the note and comments' });
  }
}

async function updateNote(req: Request, res: Response) {
  // Validation
  const validations = [body('title').isString().isLength({ min: 2, max: 100 }).withMessage('Title must be a string between 2 and 100 characters')];

  // Check for validation errors
  await Promise.all(validations.map((validation) => validation.run(req)));

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Get the note ID and updated title from the request body
  const noteId = req.params.noteId;
  const { title } = req.body;

  try {
    // Find the note by ID and update its title
    const updatedNote = await NotesSchema.findByIdAndUpdate(noteId, { title }, { new: true });

    if (!updatedNote) {
      return res.status(404).json({ error: 'Note not found' });
    }

    return res.json(updatedNote);
  } catch (error) {
    console.error('Error updating the note:', error);
    return res.status(500).json({ error: 'Failed to update the note' });
  }
}
module.exports = { deleteNote, addNote, getNotes, updateNote };
