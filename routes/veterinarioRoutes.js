
import express from "express";
import { registrar, confirmar, autenticar, restPassword, comprobarSendToken, nuevoPassword, 
        perfil, actualizarPerfil, actualizarPassword } from "../controllers/veterinarioController.js";
import checkAuth from "../middleware/authMiddleware.js";

//.Router: Clase que permite crear manejadores de rutas 
const router = express.Router();

//Publico
router.post('/', registrar);
router.get('/confirmar/:token', confirmar); //Paremetro dinámico /:param
router.post('/login', autenticar);
router.post('/rest-password', restPassword);
router.route('/rest-password/:token').get(comprobarSendToken).post(nuevoPassword);

//Privado
router.get('/perfil', checkAuth, perfil);
router.put('/perfil/:id', checkAuth, actualizarPerfil);
router.put('/actualizar-password', checkAuth, actualizarPassword);

export default router;