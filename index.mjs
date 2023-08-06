import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const handler = async(event) => {
    let body = JSON.parse(event.body)
    let email = body?.email

    if(!email) return {
        statusCode: 200,
        body: 'Email was not provided',
    };

    const msg = {
        to: email,
        from: process.env.SENDGRID_SENDER_EMAIL,
        subject: 'Sending with SendGrid is Fun',
        text: 'and easy to do anywhere, even with Node.js',
        html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    }

    sgMail
    .send(msg)
    .then(() => {
        return {
            statusCode: 200,
            body: 'Email sent!',
        };
    })
    .catch((error) => {
        console.error(error);
        throw new Error("Error while sending email")
    })
};
