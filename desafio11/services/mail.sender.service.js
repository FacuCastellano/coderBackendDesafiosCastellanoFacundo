const nodemailer = require('nodemailer')
const path = require('path')
require('dotenv').config({ path: './.env' })
const writeBody = require('../utils/mail.template')

class MailSender {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      port: 587,
      auth: {
        user: process.env.GOOGLE_ACCOUNT,
        pass: process.env.GOOGLE_PASS
      }
    })
  }

  async send(to, token) {
    const response = await this.transporter.sendMail({
      from: 'no-reply@facucoder55225.com',
      subject: 'Mensaje de prueba',
      to,
      html: writeBody(token),
      // attachments: [{
      //   filename: 'perrito.jpeg',
      //   path: path.join(__dirname, "../attachements/perrito.jpeg"),
      //   cid: 'perrito'
      // }]
    })

    console.log(response)
  }
}

module.exports = new MailSender()
const MS = new MailSender()

MS.send("castellanofacundo@gmail.com",'EELLTTTOOOKKKEEENNNN')