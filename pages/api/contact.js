export default function (req, res) {
  const nodemailer = require('nodemailer')
  const transporter = nodemailer.createTransport({
    // This is for mailtrap tester. Need to update to real SMTP settings, such as Gmail.
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD
    }
  })

  const mailData = {
    // Customize to your SMTP requirements
    from: process.env.SMTP_USERNAME,
    to: process.env.CONTACT_EMAIL, // Can be an array of recipients
    subject: `Message from ${req.body.name}: ${req.body.subject}`,
    text: `${req.body.message} | Sent from: ${req.body.email}`,
    html: `<div>${req.body.message}</div><p>Sent from: ${req.body.email}</p>`
  }

  transporter.sendMail(mailData, function (err, info) {
    if (err) {
      // TODO: Add error handling
      res.status(500).json({ success: false, err })
    } else {
      res.status(200).json({ success: true })
    }
  })
}
