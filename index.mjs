import sgMail from '@sendgrid/mail'

export const handler = async(event) => {
    let email = event?.body?.email

    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    console.log(process.env.SENDGRID_API_KEY, email)

    const msg = {
        to: email,
        from: process.env.SENDGRID_SENDER_EMAIL, // Mude para seu email verificado no sendgrid
        subject: 'Sending with SendGrid is Fun',
        text: 'and easy to do anywhere, even with Node.js',
        html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    }
    sgMail
    .send(msg)
    .then(() => {
        return {
            statusCode: 200,
            body: 'E-mail enviado',
        };
    })
    .catch((error) => {
        console.error(error);
        throw new Error("Erro ao enviar e-mail")
    })
};
