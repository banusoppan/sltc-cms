const nodemailer = require("nodemailer");
class Email {
  sendMail(){
    let transporter = nodeMailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: true,
      auth: {
          // should be replaced with real sender's account
          user: 'netm.sandbox@gmail.com',
          pass: 'SriLanka#125'
      }
    });
    let mailOptions = {
      // should be replaced with real recipient's account
      to: 'kjksopan@gmail.com',
      subject: "hello from node",
      body: "mail body"
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message %s sent: %s', info.messageId, info.response);
    });

  }

}
