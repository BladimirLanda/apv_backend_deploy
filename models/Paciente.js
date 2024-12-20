
import mongoose from "mongoose";

const pacienteSchema = mongoose.Schema({
    nombre: {
        type: String,
        require: true
    },
    propietario: {
        type: String,
        require: true
    },
    email: {
        type: String,
        requiere: true
    },
    fechaAlta: {
        type: Date,
        require: true,
        default: Date.now()
    },
    sintomas: {
        type: String,
        requiere: true
    },
    veterinario: {
        type: mongoose.Schema.Types.ObjectId, //Tipo ObjectId de MongoDB
        ref: 'Veterinario' //Relación con llave externa. Establece la referencia del documento
    }
}, {timestamps: true}); 
/*
Marcas de tiempo: Son un opción que permite agregar automáticamente campos a un esquema para almacenar la hora de creación y la última modificación de un documento.
-createdAt: Fecha que indica cuándo se creó el documento 
-updatedAt: Fecha que indica cuándo se actualizó por última vez el documento
Una vez activadas, Mongoose actualiza automáticamente los campos cada vez que se crea o modifica un documento
*/

const Paciente = mongoose.model("Paciente", pacienteSchema);

export default Paciente;
