const nodemailer = require('nodemailer');

// Setup nodemailer
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth:{
    user: 'vinitpandey858@gmail.com', // your email address
    pass: 'ydcb iydr lbfe tlss' // your email password
  }
});

/* function sendMail(data, res) {
  const { name, email, project } = data;

  const mailOptions = {
    from: email,
    to: 'agsunny123@gmail.com',
    subject: 'New Project Inquiry',
    text: `Name: ${name}\nEmail: ${email}\nProject Details: ${project}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('Something went wrong');
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send('Email sent successfully');
    }
  });
}

module.exports = { sendMail }; */
function sendMail(data, res) {
  const { name, email, project } = data;

  const mailOptions = {
    from: email,
    to: 'vinitpandey858@gmail.com',
    subject: 'New Project Inquiry',
    text: `Name: ${name}\nEmail: ${email}\nProject Details: ${project}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('Something went wrong');
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send('Email sent successfully');
    }
  });
}
module.exports = { sendMail };