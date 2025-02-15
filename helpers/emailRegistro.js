//https://www.nodemailer.com/
//https://mailtrap.io/inboxes/
import nodemailer from 'nodemailer';

const emailRegistro = async (datos) => {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const {nombre, email, token} = datos;

    //Envio de Email
    const info = await transporter.sendMail({
        from: "APV - Administrados de Pacientes de Veterinaria",
        to: email,
        subject: "Comprueba tu cuenta en APV",
        text: "Comprueba tu cuenta en APV",
        html: `
        <p>Hola ${nombre}, comprueba tu cuenta en APV.</p>
        <p>Tu cuenta ya está lista para usarse!! Solo cumpruébala en el siguiente enlace:
        <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Comprobar Cuentas</a>
        </p>

        <p>Si tú no creaste esta cuenta, puedes ignorar este mensaje.</p>
        `
    });
    console.log('Mensaje enviado: ', info.messageId);
}

export default emailRegistro;