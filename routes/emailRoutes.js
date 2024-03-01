const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

router.post('/send', (req, res) => {
  const { name, email, message } = req.body;
  

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.User,
      pass: process.env.Pass,
    }
  });

  const mailOptions = {
    from: process.env.User,
    to: email,
    subject: 'Thank you for contacting us!',
    text: `Dear ${name},\n\nThank you for reaching out to us. We have received your message and will get back to you as soon as possible.\n\nBest regards, \n`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).send({ message: 'Error sending email' });
    } else {
      console.log('Email sent to user:', info.response);
      res.status(200).send({ message: 'Email sent successfully' });
    }
  });
});

module.exports = router;
