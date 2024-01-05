const nodemailer = require('nodemailer');

const sendMail = async ({ to, content } ) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465, // SMTP port for secure connection
            secure: true, // Use SSL/TLS
            auth: {
                user: 'vsvetri30@gmail.com', // Your Gmail email address
                pass: 'dbmcoxlqacibjcqx' // Your Gmail password or app-specific password
            }
        });


        let sendMail = await transporter.sendMail({
            from: 'vsvetri30@gmail.com',
            to: to, // Email address of the recipient
            subject: 'Hello from Nodemailer',
            html: content
        })

        console.log(sendMail && sendMail.messageId)
    } catch (err) {
        console.log('EMAIL ERR : ', err)
    }
}

module.exports = sendMail;

