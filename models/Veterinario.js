
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import generalId from "../helpers/generarId.js";

//.Schema: Clase que implementa la estructura que define cómo se almacenan los documentos en una colección
const veterinarioSchema = mongoose.Schema({
    nombre: {
        type: String,
        require: true,
        trim: true
    },
    password: {
        type: String, 
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true,
        trim: true
    },
    telefono: {
        type: String, 
        default: null,
        trim: true
    },
    web: {
        type: String,
        default: null
    },
    token: {
        type: String,
        default: generalId()
    },
    confirmado: {
        type: Boolean,
        default: false
    }
});

//.pre(): Método que asigna un método de ejecución previa al módelo
veterinarioSchema.pre('save', async function(next) {
    //.isModief(): Método booleano que verifica la modificación en un campo especifico
    if(!this.isModified('password')) {
        //next(): Da el salto al siguiente middleware y no ejecuta el código interno
        next();
    }

    //genSalt(): Establece el conjunto de bits aleatorios que se utiliza para proteger contraseñas
    const salt = await bcrypt.genSalt(10);
    //has(): Método de hasheo según un salt establecido
    this.password = await bcrypt.hash(this.password, salt);
});

//.methods: Declaración de métodos internos
veterinarioSchema.methods.comprobarPassword = async function (pswFormulario) {
    return await bcrypt.compare(pswFormulario, this.password);
}

//.model: Declaración de tipo modelo y interacción con una colección de la DB
const Veterinario = mongoose.model("Veterinario", veterinarioSchema);

export default Veterinario;