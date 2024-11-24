const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Contact Form Submission
app.post('/contact', (req, res) => {
    const { contactName, contactEmail, contactMessage } = req.body;

    // Setup Nodemailer transporter
    const transporter = nodemailer.createTransport({
        service: 'Gmail', // Use your email service
        auth: {
            user: 'your-email@gmail.com', // Your email
            pass: 'your-email-password' // Your email password
        }
    });

    const mailOptions = {
        from: contactEmail,
        to: 'info@projectcorp.com', // Your receiving email
        subject: `Contact Form Submission from ${contactName}`,
        text: contactMessage
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            return res.status(500).send('Error sending message');
        }
        res.status(200).send('Message sent successfully!');
    });
});

// Registration Form Submission (You can expand this as needed)
app.post('/register', (req, res) => {
    const { name, email, phone, course } = req.body;
    // Here you would typically save the registration details to a database
    console.log(`New registration: ${name}, ${email}, ${phone}, ${course}`);
    res.status(200).send('Registration successful!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});