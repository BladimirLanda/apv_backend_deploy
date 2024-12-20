
import jwt from "jsonwebtoken";
import Veterinario from "../models/Veterinario.js";

const checkAuth = async (req, res, next) => {
    let JWtoken;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    
        try {
            JWtoken = req.headers.authorization.split(' ')[1];
            
            const decoded = jwt.verify(JWtoken, process.env.JWT_SECRET);

            //.findById(): Método de coincidencia por ID en la DB y retorno del documento
            req.veterinario = await Veterinario.findById(decoded.id).select("-password -token -confirmado");

            next();
        } catch (error) {
            const error2 = new Error('Token no valido');
            res.status(403).json({msg: error2.message, info: error.name});
        }

    }

    if(!JWtoken) {
        const error = new Error('Token no valido o inexistente');
        res.status(403).json({msg: error.message});
    }
}

export default checkAuth;