import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import config from './config/config';
const Notes = require('./routs/notes');
const Comments = require('./routs/comments');
const app = express();
const Port = process.env.PORT || 3000

// Load environment variables from .env
dotenv.config();

app.use(cors());
app.use(bodyParser.json());

mongoose
  .connect(config.mongo.url, { retryWrites: true, w: 'majority' })
    .then(() => {
      console.log('Connected to mongoDB.');
    })
    .catch((error) => {
      console.log('Unable to connect.');
      console.log(error);
    });

app.use('/api/notes', Notes);
app.use('/api/comments', Comments);

app.listen(Port, () => {
  console.log(`Server started on port ${Port}`);
});
