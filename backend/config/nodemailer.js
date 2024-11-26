const nodemailer = require("nodemailer");

module.exports.sendEmail = async (mail, name, otp) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail', 
            auth: {
                user: process.env.MAIL, 
                pass: process.env.MAIL_KEY 
            }
        });

        const mailOptions = {
            from: process.env.MAIL,  
            to: mail,  
            subject: 'Email Verification',
            text: `Hello ${name},\n\nPlease use the following OTP to verify your email address:\n\n${otp}\n\nThis OTP will expire in 10 minutes.\n\nThank you.`
        };

        await transporter.sendMail(mailOptions);

        return { message: 'Verification email sent' };
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Failed to send email');
    }
};
