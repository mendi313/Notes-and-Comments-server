import { Request, Response } from 'express';
import CommentsSchema from '../models/CommentsSchema';
import NotesSchema from '../models/NotesSchema';

async function getComments(req: Request, res: Response) {
  try {
    const noteId = req.query.noteId as string; // Access noteId as a query parameter
    if (!noteId) {
      return res.status(400).json({ error: 'noteId is required in the query parameters' });
    }
    const comments = await CommentsSchema.find({ note_id: noteId });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve comments' });
  }
}

async function addComment(req: Request, res: Response) {
  try {
    const noteId = req.query.noteId as string; // Access noteId as a query parameter
    if (!noteId) {
      return res.status(400).json({ error: 'noteId is required in the query parameters' });
    }
    const { text } = req.body;

    // Check if the note exists
    const note = await NotesSchema.findById(noteId);
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    const newComment = new CommentsSchema({
      note_id: noteId,
      text,
    });

    const savedComment = await newComment.save();
    res.status(201).json(savedComment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add a comment' });
  }
}

async function deleteComment(req: Request, res: Response) {
  try {
    const commentId = req.params.commentId; // Access commentId as a URL parameter
    if (!commentId) {
      return res.status(400).json({ error: 'commentId is required in the URL' });
    }

    // Check if the comment exists
    const comment = await CommentsSchema.findById(commentId);
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    // Delete the comment
    await CommentsSchema.findByIdAndDelete(commentId);


    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete the comment' });
  }
}

// Update a comment by its ID
async function updateComment(req: Request, res: Response) {
  try {
    const commentId = req.params.commentId; // Access commentId as a URL parameter
    if (!commentId) {
      return res.status(400).json({ error: 'commentId is required in the URL' });
    }

    const { text } = req.body;

    // Check if the comment exists
    const comment = await CommentsSchema.findById(commentId);
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    // Update the comment with the new text
    comment.text = text; // Assuming your CommentsSchema has a 'text' field

    const updatedComment = await comment.save();
    res.json(updatedComment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update the comment' });
  }
}

module.exports = { addComment, getComments,updateComment, deleteComment };
