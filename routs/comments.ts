// Import the required modules and functions
import express from 'express';
import { validationResult, body } from 'express-validator';
const { addComment, getComments, deleteComment, updateComment } = require('../controller/commentsController');

const router = express.Router();

// Validation middleware for adding a comment
const validateAddComment = [body('text').isString().isLength({ min: 1, max: 500 }).withMessage('Text must be a string between 1 and 500 characters')];

// Routes
router.post('/', validateAddComment, addComment); // Add a comment
router.get('/', getComments); // Get comments
router.delete('/:commentId', deleteComment); // Delete a comment by ID
router.put('/:commentId', updateComment); // Update a comment by ID

module.exports = router;
