import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import authRoute from './routes/auth.route.js';
import userRoute from './routes/user.route.js';

dotenv.config();
const app = express();

const { MONGO_URI } = process.env;
const { PORT } = process.env || 3000;
//middleware
app.use(express.json());
app.use('/api/auth', authRoute);
app.use('/api/posts', userRoute);

app.all('*', (req, res) => {
  res.status(404).json({ message: 'Not Found' });
});

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('connected to DB');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => console.log('something went wrong', err));
