
import Paciente from "../models/Paciente.js"
import mongoose from "mongoose";

const agregarPaciente = async (req, res) => {
    const paciente = new Paciente(req.body);
    paciente.veterinario = req.veterinario._id;
    
    try {
        const pacienteSave = await paciente.save();
        res.json(pacienteSave);
    } catch (error) {
        console.log(`ERROR: ${error}`);
    }
}

const obtenerPacientes = async (req, res) => {
    const veterinario = req.veterinario._id;
    //.find(): Método de busqueda con retorno tipo arreglo de todos los coincidentes
    const pacientes = await Paciente.find({veterinario}); //.where('veterinario').equals(req.veterinario)

    res.json(pacientes);
}

const obtenerPaciente = async(req, res) => {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        const error = new Error('ID no válido');
        return res.status(400).json({ msg: error.message });
    }

    const paciente = await Paciente.findById(id);

    if(!paciente) {
        const error = new Error('Paciente no encontrado');
        return res.status(400).json({msg: error.message});
    }

    //Comparación ObjectId
    if(paciente.veterinario.toString() !== req.veterinario._id.toString()) {
        return res.json({msg: 'Acción no valida'});
    }

    if(paciente) {
        res.json(paciente);
    }
}

const actualizarPaciente = async(req, res) => {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        const error = new Error('ID no válido');
        return res.status(400).json({ msg: error.message });
    }

    const paciente = await Paciente.findById(id);

    if(!paciente) {
        const error = new Error('Paciente no encontrado');
        return res.status(400).json({msg: error.message});
    }

    if(paciente.veterinario.toString() !== req.veterinario._id.toString()) {
        return res.json({msg: 'Acción no valida'});
    }

    if(paciente) {
        paciente.nombre = req.body.nombre || paciente.nombre;
        paciente.propietario = req.body.propietario || paciente.propietario;
        paciente.email = req.body.email || paciente.email;
        paciente.fechaAlta = req.body.fechaAlta || paciente.fechaAlta;
        paciente.sintomas = req.body.sintomas || paciente.sintomas;

        try {
            const pacienteAcualizado = await paciente.save();
            res.json(pacienteAcualizado);
        } catch (error) {
            console.log(`ERROR: ${error}`);
        }
    }
}

const eliminarPaciente = async(req, res) => {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        const error = new Error('ID no válido');
        return res.status(400).json({ msg: error.message });
    }

    const paciente = await Paciente.findById(id);

    if(!paciente) {
        const error = new Error('Paciente no encontrado');
        return res.status(400).json({msg: error.message});
    }

    if(paciente.veterinario.toString() !== req.veterinario._id.toString()) {
        return res.json({msg: 'Acción no valida'});
    }

    try {
        await paciente.deleteOne();
        res.json({msg: 'Paciente eliminado'});
    } catch (error) {
        console.log(`ERROR: ${error}`);
    }
}

export {
    agregarPaciente,
    obtenerPacientes,
    obtenerPaciente,
    actualizarPaciente,
    eliminarPaciente
}