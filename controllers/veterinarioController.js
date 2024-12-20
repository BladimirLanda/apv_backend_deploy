
import Veterinario from "../models/Veterinario.js";
import generalJWT from "../helpers/generarJWT.js";
import generalId from "../helpers/generarId.js";
import emailRegistro from "../helpers/emailRegistro.js";
import emailRestPassword from "../helpers/emailRestPassword.js";

const registrar = async (req, res) => {
    const { nombre, email } = req.body;

    //.finOne(): Método de coincidencia con el primer documento en la DB y retorno del documento
    const existeUsuario = await Veterinario.findOne({email});

    if(existeUsuario) {
        const error = new Error('Usuario ya registrado');
        //400: El servidor no pudo procesar una solicitud
        return res.status(400).json({msg: error.message});
    }

    try {
        const veterinario = new Veterinario(req.body);
        //.save: Método de guardado en la colección y retorno del documento
        //En dado caso que no exista la colección la crea con el nombre del módelo
        const veterinarioSave = await veterinario.save();

        //Envio de Email
        emailRegistro({
            nombre,
            email,
            token: veterinarioSave.token
        });

        res.json(veterinarioSave);
    } catch (error) {
        console.error(`ERROR: ${error}`);
    }
}

const confirmar = async (req, res) => {
    const { token } = req.params;

    const usuarioConfirmar = await Veterinario.findOne({token});

    if(!usuarioConfirmar) {
        const error = new Error('Token no valido');
        //404: El servidor no puede encontrar la URL solicitada
        return res.status(404).json({msg: error.message});
    }

    try {
        usuarioConfirmar.token = null;
        usuarioConfirmar.confirmado = true;

        await usuarioConfirmar.save();

        res.json({msg: 'Usuario confirmado correctamente...'})
    } catch (error) {
        console.error(`ERROR: ${error}`);
    }
}

const autenticar = async (req, res) => {
    const { email, password } = req.body;

    const usuario = await Veterinario.findOne({email});

    if(!usuario) {
        const error = new Error('El usuario no existe');
        return res.status(404).json({msg: error.message});
    }

    if(!usuario.confirmado) {
        const error = new Error('La cuenta no ha sido confirmada')
        //403: El servidor web ha recibido la petición del usuario, pero no permite acceso
        return res.status(403).json({msg: error.message});
    }

    if(await usuario.comprobarPassword(password)) {
        res.json({
            _id: usuario._id, 
            nombre: usuario.nombre, 
            email: usuario.email,
            JWToken: generalJWT(usuario._id)
        });
    } else {
        const error = new Error('El Password es incorrecto');
        res.status(404).json({msg: error.message});
    }
}

const restPassword = async (req, res) => {
    const { email } = req.body;

    const existeVeterinario = await Veterinario.findOne({email});

    if(!existeVeterinario) {
        const error = new Error('El usuario no existe');
        return res.status(400).json({msg: error.message});
    }

    try {
        existeVeterinario.token = generalId();
        await existeVeterinario.save();

        //Envio de Email
        emailRestPassword({
            nombre: existeVeterinario.nombre,
            email,
            token: existeVeterinario.token
        });

        res.json({msg: 'Hemos enviado un email con las instrucciones'})
    } catch (error) {
        console.error(`ERROR: ${error}`);
    }

}

const comprobarSendToken = async (req, res) => {
    const { token } = req.params;

    const tokenValido = await Veterinario.findOne({token});

    if(tokenValido) {
        res.json({msg: 'Token valido'});
    } else {
        const error = new Error('Token no valido');
        res.status(400).json({msg: error.message});
    }
}

const nuevoPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    const veterinario = await Veterinario.findOne({token});

    if(!veterinario) {
        const error = new Error('Hubo un error: Token');
        return res.status(400).json({msg: error.message});
    }

    try {
        veterinario.token = null;
        veterinario.password = password;

        await veterinario.save();
        res.json({msg: 'Password Reestablecido'});
    } catch (error) {
        console.error(`ERROR: ${error}`);
    }
}

const perfil = (req, res) => {
    const { veterinario } = req;

    res.json({ veterinario });
}

const actualizarPerfil = async (req, res) => {
    const veterinario = await Veterinario.findById(req.params.id);

    if(!veterinario) {
        const error = new Error('Hubo un error');
        return res.status(400).json({msg: error.message});
    }

    const { email } = req.body;
    if(veterinario.email !== req.body.email) {
        const existeEmail = await Veterinario.findOne({email});
        if(existeEmail) {
            const error = new Error('Hubo un error - Utilice otro correo');
            return res.status(400).json({msg: error.message});
        }
    }

    try {
        veterinario.nombre = req.body.nombre;
        veterinario.email = req.body.email;
        veterinario.web = req.body.web || '';
        veterinario.telefono = req.body.telefono || '';

        const veterinarioActualizado = await veterinario.save();
        res.json(veterinarioActualizado);
    } catch (error) {
        console.error(`ERROR: ${error}`);
    }
}

const actualizarPassword = async (req, res) => {
    const { id } = req.veterinario;
    const { pwd_actual, pwd_nuevo } = req.body;

    const veterinario = await Veterinario.findById(id);
    if(!veterinario) {
        const error = new Error('Hubo un error');
        return res.status(400).json({msg: error.message});
    }

    if(await veterinario.comprobarPassword(pwd_actual)) {
        veterinario.password = pwd_nuevo;
        await veterinario.save();
        res.json( {msg: 'Password almacenado correctamente'} );
    } else {
        const error = new Error('El Password no coincide - Favor de verificar');
        return res.status(400).json({msg: error.message});
    }



}

export {
    registrar,
    confirmar,
    autenticar,
    restPassword,
    comprobarSendToken,
    nuevoPassword,
    perfil,
    actualizarPerfil,
    actualizarPassword
}