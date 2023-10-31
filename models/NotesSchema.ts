import mongoose, { Document, Schema } from 'mongoose';

// Define the schema
export interface INote extends Document {
  title: string;
  created_at: Date;
}

const noteSchema = new Schema<INote>({
  title: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 100,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

// Create the model
const NoteModel = mongoose.model<INote>('Note', noteSchema);

export default NoteModel;
