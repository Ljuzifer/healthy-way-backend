const nodemailer = require("nodemailer");
require("dotenv").config();

const { META_PASS, META_MAIL, BASE_RENDER_URL, BASE_LOCAL_URL } = process.env;
// const { GMAIL_MAIL, GMAIL_PASS, BASE_RENDER_URL, BASE_LOCAL_URL } = process.env;
// const { HOT_MAIL, HOT_PASS, BASE_RENDER_URL, BASE_LOCAL_URL } = process.env;

const mailerConfig = {
    pool: true,
    // host: "smtp.gmail.com",
    host: "smtp.meta.ua",
    // host: "smtp-mail.outlook.com",
    port: 465,
    secure: true,
    // requireTLS: true,
    auth: {
        user: META_MAIL,
        pass: META_PASS,
    },
    // tls: {
    //     // do not fail on invalid certs
    //     rejectUnauthorized: false,
    // },
};

const transport = nodemailer.createTransport(mailerConfig);

async function ForgotPassSender(mail, password, name) {
    const email = {
        to: mail,
        from: `"Dmytro" <${META_MAIL}>`,
        subject: "Your new password for Healthy Way App",
        html: `<!DOCTYPE html>
               <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <link
      href="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwXzY4NDVfMTU2MikiPgo8Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIyMCIgZmlsbD0iIzBGMEYwRiIvPgo8cGF0aCBkPSJNMTguNzQgMTIuNTU2VjI4SDE0Ljk3OFYyMS42NDJIOS4xMjZWMjhINS4zNjRWMTIuNTU2SDkuMTI2VjE4LjYwNkgxNC45NzhWMTIuNTU2SDE4Ljc0Wk0zNC44MzE4IDEyLjU1NlYyOEgzMS4wNjk4VjIxLjY0MkgyNS4yMTc4VjI4SDIxLjQ1NThWMTIuNTU2SDI1LjIxNzhWMTguNjA2SDMxLjA2OThWMTIuNTU2SDM0LjgzMThaIiBmaWxsPSJ3aGl0ZSIvPgo8L2c+CjxkZWZzPgo8Y2xpcFBhdGggaWQ9ImNsaXAwXzY4NDVfMTU2MiI+CjxyZWN0IHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgZmlsbD0id2hpdGUiLz4KPC9jbGlwUGF0aD4KPC9kZWZzPgo8L3N2Zz4K"
      rel="icon"
      type="image/x-icon"
    />
    <title>Healthy Way App • New password</title>
  </head>
  <body style="background-color: #0f0f0f; color: #ffffff; font-family: Roboto">
    <div style="border: 1px solid #ffffff; width: 100%; background-color: black">
      <div style="padding: 30px; text-align: center; color: white">
        <p style="font-weight: 400; font-size: 16px; line-height: 1.5; color: white">
          Hi, ${name}!
          <hr />
          Here is your new password for the Healthy Way App!
          <br />

          Please use it for the enter "Healthy Way App": <b>${password}</b>
          <br/>
          You can change it in your profile.
        </p>
        <br />
        <a
          style="
            display: inline-block;
            color: #0f0f0f;
            text-decoration: none;
            padding: 8px 16px;
            background-color: #e3ffa8;
            font-weight: 500;
            font-size: 14px;
            line-height: 1.43;
            border-radius: 12px;
            border: none;
            text-align: center;
            width: 10em;
            box-shadow: none;
            transition: 250ms cubic-bezier(0.4, 0, 0.2, 1);
            "
          target="_blank"
          href="https://ljuzifer.github.io/healthy-way/signin"
          >Healthy Way App</a
        >
        <br />
        <br />
        <br />

        <img
          alt="Healthy Way App"
          style="width: 20em"
          src="https://res.cloudinary.com/dcmbasmpz/image/upload/v1702687979/healthy-way-app/tkt3aconcvmskuxbi67v.png"
        />

        <br />
        <p>This is automatic letter sender, you don't need to answer for it!</p>
        
        <br />
      </div>
    </div>
  </body>
</html>`,
        headers: {
            "X-Mailer": "nodemailer",
            "X-Accept-Language": "en",
        },
    };

    await transport.sendMail(email);

    return true;
}

async function EmailSender(mail, name, code) {
    const email = {
        to: mail,
        from: `"Dmytro" <${META_MAIL}>`,
        subject: "Verify your email please!",
        html: `<!DOCTYPE html>
               <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <link
      href="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwXzY4NDVfMTU2MikiPgo8Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIyMCIgZmlsbD0iIzBGMEYwRiIvPgo8cGF0aCBkPSJNMTguNzQgMTIuNTU2VjI4SDE0Ljk3OFYyMS42NDJIOS4xMjZWMjhINS4zNjRWMTIuNTU2SDkuMTI2VjE4LjYwNkgxNC45NzhWMTIuNTU2SDE4Ljc0Wk0zNC44MzE4IDEyLjU1NlYyOEgzMS4wNjk4VjIxLjY0MkgyNS4yMTc4VjI4SDIxLjQ1NThWMTIuNTU2SDI1LjIxNzhWMTguNjA2SDMxLjA2OThWMTIuNTU2SDM0LjgzMThaIiBmaWxsPSJ3aGl0ZSIvPgo8L2c+CjxkZWZzPgo8Y2xpcFBhdGggaWQ9ImNsaXAwXzY4NDVfMTU2MiI+CjxyZWN0IHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgZmlsbD0id2hpdGUiLz4KPC9jbGlwUGF0aD4KPC9kZWZzPgo8L3N2Zz4K"
      rel="icon"
      type="image/x-icon"
    />
    <title>Healthy Way App • Email Confirmation</title>
  </head>
  <body style="background-color: #0f0f0f; color: #ffffff; font-family: Roboto">
    <div style="border: 1px solid #ffffff; width: 100%; background-color: black">
      <div style="padding: 30px; text-align: center; color: white">
        <p style="font-weight: 400; font-size: 16px; line-height: 1.5; color: white">
          Hi, ${name}!
          <hr />
          Thanks for registering the Healthy Way App!
          <br />
          Please click the button below to confirm you email address:
        </p>
        <br />
        <a
          style="
            display: inline-block;
            color: #0f0f0f;
            text-decoration: none;
            padding: 8px 16px;
            background-color: #e3ffa8;
            font-weight: 500;
            font-size: 14px;
            line-height: 1.43;
            border-radius: 12px;
            border: none;
            text-align: center;
            width: 10em;
            box-shadow: none;
            transition: 250ms cubic-bezier(0.4, 0, 0.2, 1);
            "
          target="_blank"
          href="${BASE_RENDER_URL || BASE_LOCAL_URL}/api/auth/verify/${code}"
          >Verify my email</a
        >
        <br />
        <br />
        <br />

        <img
          alt="Healthy Way App"
          style="width: 20em"
          src="https://res.cloudinary.com/dcmbasmpz/image/upload/v1702687979/healthy-way-app/tkt3aconcvmskuxbi67v.png"
        />

        <br />
        <p>This is automatic letter sender, you don't need to answer for it!</p>
        <br />
      </div>
    </div>
  </body>
</html>`,
        headers: {
            "X-Mailer": "nodemailer",
            "X-Accept-Language": "en",
        },
    };

    await transport.sendMail(email);

    return true;
}

module.exports = { EmailSender, ForgotPassSender };
