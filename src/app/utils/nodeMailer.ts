import config from "../config";
import nodemailer from 'nodemailer';



export const SendEmail = async (to:string,html:string,subject:string) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // Use `true` for port 465, `false` for all other ports
        auth: {
            user: "piyasmahmudealif@gmail.com",
            pass: config.mail_secret,
        },
    });
    await transporter.sendMail({
        from: 'FULL_AUTH_SERVICE LTD.', // sender address
        to, // list of receivers
        subject, // Subject line
        text: "", // plain text body
        html, // html body
    });
}