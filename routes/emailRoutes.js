const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const Email = require('../models/Email.js')

dotenv.config();

router.post('/send', async (req, res) => {
  const { name, email, message } = req.body;

  // Create a new Email document
  const newEmail = new Email({
    name,
    email,
    message,
  });

  try {
    // Save the email data to the database
    await newEmail.save();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.User,
        pass: process.env.Pass,
      },
    });

    const mailOptions = {
      from: process.env.User,
      to: email,
      subject: 'Thank you for contacting us!',
      html: `
        <p style="font-size: 16px; color: #333; font-weight: bold;">Dear ${name},</p>
        <p style="font-size: 14px; color: #666;">Thank you for reaching out to us. We have received your message and will get back to you as soon as possible.</p>
        <p style="font-size: 14px; color: #666;">Best regards,</p>
      `,
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
  } catch (error) {
    console.error('Error saving email to database:', error);
    res.status(500).send({ message: 'Error saving email to database' });
  }
});


module.exports = router;
