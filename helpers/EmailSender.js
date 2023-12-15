const nodemailer = require("nodemailer");
require("dotenv").config();

// const { META_PASS, META_MAIL, BASE_LOCAL_URL } = process.env;
// const { GMAIL_MAIL, GMAIL_PASS, BASE_RENDER_URL, BASE_LOCAL_URL } = process.env;
const { HOT_MAIL, HOT_PASS, BASE_RENDER_URL, BASE_LOCAL_URL } = process.env;

const mailerConfig = {
    pool: true,
    // host: "smtp.gmail.com",
    // host: "smtp.meta.ua",
    host: "smtp-mail.outlook.com",
    port: 587,
    secure: false,
    // requireTLS: true,
    auth: {
        user: HOT_MAIL,
        pass: HOT_PASS,
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
        from: HOT_MAIL,
        subject: "Verify your email please!",
        html: `<a target="_blank" href="${BASE_RENDER_URL}/auth/verify/${code}">Click to verify your email</a>`,
    };

    await transport.sendMail(email);

    return true;
}

module.exports = EmailSender;
