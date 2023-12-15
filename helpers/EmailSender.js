const nodemailer = require("nodemailer");
require("dotenv").config();

// const { META_PASS, META_MAIL, BASE_LOCAL_URL } = process.env;
const { GMAIL_MAIL, GMAIL_PASS, BASE_RENDER_URL, BASE_LOCAL_URL } = process.env;

const mailerConfig = {
    pool: true,
    host: "smtp.gmail.com",
    // host: "smtp.meta.ua",
    // host: "smtp.mail.yahoo.com",
    port: 465,
    secure: true,
    requireTLS: true,
    auth: {
        user: GMAIL_MAIL,
        pass: GMAIL_PASS,
    },
    // tls: {
    //     // do not fail on invalid certs
    //     rejectUnauthorized: false,
    // },
};

const transport = nodemailer.createTransport(mailerConfig);

async function EmailSender(mail, code) {
    const email = {
        to: mail,
        from: GMAIL_MAIL,
        subject: "Verify your email please!",
        html: `<a target="_blank" href="${BASE_RENDER_URL}/auth/verify/${code}">Click to verify your email</a>`,
    };

    await transport.sendMail(email);

    return true;
}

module.exports = EmailSender;
