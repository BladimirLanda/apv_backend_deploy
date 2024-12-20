
import express from "express";
import dotenv from "dotenv";
import cors from "cors"; //Protección y gestión de api
import connectionDB from "./config/db.js";
import routerVeterinario from "./routes/veterinarioRoutes.js";
import routerPaciente from "./routes/pacientesRoutes.js";

//Orden de Middlewares

//Instanciamiento de express
const app = express();

//.use(): Establece la configuración de express
//Configuración de tipo de envio de datos
app.use(express.json());

//Escaneo de dontenv en los archivos .env
dotenv.config();

//Conexión a DB
connectionDB();

//Cors Dominios (Intercambio de recursos entre orígenes)
const dominiosPermitidos = [process.env.FRONTEND_URL];

const corsOptions = {
    origin: function(origin, callback) {
        if(dominiosPermitidos.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('No permitdo por Cors'));
        }
    }
}

app.use(cors( corsOptions ));

//.use: Método HTTP general
app.use('/api/veterinarios', routerVeterinario);
app.use('/api/pacientes', routerPaciente);

//En el despliegue de la app en servidores NodeJS existe la variable de entorno PORT || En otro caso Puerto 4000
const PORT = process.env.PORT || 4000;

//.listen: Establece el servidor web y la escucha de acceso al puerto
app.listen(PORT, () => {
    console.log(`Servidor funcionando en el puerto ${PORT}`);
});

