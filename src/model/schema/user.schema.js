import mongoose from 'mongoose';
import postSchema from './post.schema.js';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      minlength: 3,
      maxlength: 50,
      required: true,
    },
    email: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 255,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 1024,
    },
    confirmPassword: {
      type: String,
      required: true,
    },
    posts: [postSchema],
  },
  { timestamps: true }
);

const User = mongoose.model('user', userSchema);

export default User;
