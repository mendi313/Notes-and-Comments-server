import mongoose, { Document, Schema } from 'mongoose';

export interface IComment extends Document {
  note_id: mongoose.Types.ObjectId;
  text: string;
  created_at: Date;
}

const commentSchema = new Schema<IComment>({
  note_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Note', // Reference to the Note model
    required: true,
  },
  text: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 500,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const CommentModel = mongoose.model<IComment>('Comment', commentSchema);

export default CommentModel;
