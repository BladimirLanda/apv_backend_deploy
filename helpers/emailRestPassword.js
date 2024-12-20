import nodemailer from 'nodemailer';

const emailRestPassword = async (datos) => {
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
        subject: "Reestablece tu Contraseña",
        text: "Reestablece tu Contraseña",
        html: `
        <p>Hola ${nombre}, has solicitado reestablecer tu contraseña.</p>
        <p>Sigue el siguiente enlace para generar una nueva contraseña:
        <a href="${process.env.FRONTEND_URL}/rest-password/${token}">Reestablecer Contraseña</a>
        </p>

        <p>Si tú no pediste reestablecer la contraseña, puedes ignorar este mensaje.</p>
        `
    });
    console.log('Mensaje enviado: ', info.messageId);
}

export default emailRestPassword;