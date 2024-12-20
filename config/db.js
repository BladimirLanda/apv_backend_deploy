
import mongoose from "mongoose";

const connectionDB = async() => {
    const driver = process.env.MONGO_URI;

    try {
        const db = await mongoose.connect(driver, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });

            const url = `${db.connection.host}:${db.connection.port}`;
            console.log(`MongoDB conectado en -> ${url}`);
    } catch (error) {
        console.error(`ERROR: ${error.message}`);
        //process.exit(1) [Nodejs]: Termina el proceso actual y devuelve un código de salida al sistema operativo.
        process.exit(1);
    }
}

export default connectionDB;