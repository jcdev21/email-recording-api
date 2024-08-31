import nodemailer from 'nodemailer';
import mustache from 'mustache';

export async function sendMail(
  subject: string,
  toEmail: string,
  bodyText: string,
  payload?: {
    [key: string]: string | number | Date | boolean | null | undefined;
  }
) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PASSWORD
    }
  });

  await new Promise((resolve, reject) => {
    transporter.sendMail(
      {
        from: process.env.NODEMAILER_EMAIL,
        to: toEmail,
        subject,
        html: mustache.render(bodyText, {
          ...payload
        })
      },
      (err, response) => {
        if (err) {
          reject(err);
        }

        resolve(response);
      }
    );
  });
}
