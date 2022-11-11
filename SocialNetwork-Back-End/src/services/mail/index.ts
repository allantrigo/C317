import * as nodemailer from 'nodemailer'

export default abstract class Mail {
  static sendMail (to?: string, subject?: string, message?: string) {
    let mailOptions = {
      from: 'franciscoeletrikpa2@gmail.com',
      to: to,
      subject: subject,
      html: message
    }

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'franciscoeletrikpa2@gmail.com',
        pass: 'ddpgjjqqcjulvbkk'
      },
      tls: { rejectUnauthorized: false }
    })

    console.log(transporter)

    console.log(mailOptions)

    transporter.sendMail(mailOptions, function (error, info) {
      console.log('aqui')
      if (error) {
        console.log(error)
        return error
      } else {
        console.log('sucesso')
        return 'E-mail enviado com sucesso!'
      }
    })
  }
}
