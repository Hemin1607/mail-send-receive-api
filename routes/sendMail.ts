var nodemailer = require('nodemailer');

module.exports.sendEmail = function(req,res){
    let reqestObject = req.body;
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
          type : "login",
          user: reqestObject.sender_email,
          pass:reqestObject.sender_password
        },
        tls: {
            rejectUnauthorized: false
        },
        secure: false
      });
      
      var mailOptions = {
        from: reqestObject.sender_password,
        to: reqestObject.receiver_email,
        subject: reqestObject.subject,
        html: reqestObject.message
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          res.send({message : "Problem with email"})
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
          res.send({message : "Mail send successfully"})
        }
      });
}