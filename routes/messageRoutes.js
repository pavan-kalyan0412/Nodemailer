// // routes/messageRoutes.js

// const express = require('express');
// const router = express.Router();
// const Message = require('../routes/messageRoutes');

// // Route to store messages
// router.post('/store', (req, res) => {
//   const { name, email, message } = req.body;

//   // Create a new Message document
//   const newMessage = new Message({
//     name,
//     email,
//     message
//   });

//   // Save the message to the database
//   newMessage.save()
//     .then(savedMessage => {
//       console.log('Message saved to database:', savedMessage);
//       res.status(201).json({ message: 'Message saved successfully' });
//     })
//     .catch(error => {
//       console.error('Error saving message to database:', error);
//       res.status(500).json({ error: 'Internal server error' });
//     });
// });

// module.exports = router;
