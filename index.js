const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const emailRoutes = require('./routes/emailRoutes');
const messageRoutes = require('./routes/messageRoutes');

const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

async function connectToDatabase() {
  try {
    await mongoose.connect('mongodb://localhost:27017/nodemail');
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
}

connectToDatabase();

app.use('/email', emailRoutes);
app.use('/messages', messageRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
