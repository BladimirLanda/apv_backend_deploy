
//El token web JSON (JWT) es un estándar abierto (RFC 7519) que define un método compacto y autocontenido para la transmisión segura de información entre partes codificadas como un objeto JSON. Esta información puede verificarse y ser fiable porque está firmada digitalmente. https://jwt.io/
/*
Los JSON Web Tokens (JWT) se usan para autenticar y compartir información de manera segura:
-Representan la transimición de información entre dos partes, como la identidad de un usuario y sus asociaciones.
-Se pueden usar para autenticar solicitudes en navegadores, dispositivos móviles y escritorios.
-Son un estándar abierto que define un método compacto para transmitir información de manera segura.
La información que contienen está firmada digitalmente, por lo que es fiable y se puede verificar.

Los JWT están compuestos por tres partes separadas por puntos (.): 
1) Header: Contiene el algoritmo que se usa para crear la firma y el tipo de token.
2) Payload: Contiene datos de autenticación como contraseñas y correos electrónicos.
3) Signature: Compuesta por la codificación del encabezado y el payload más una clave secreta.
*/

import jwt from "jsonwebtoken";

const generalJWT = (id) => {
    //.sign(): Generación del nuevo jwt
    return jwt.sign({id}, process.env.JWT_SECRET, {
        //expiresIn: Declaración de expiración en un tiempo especifico
        expiresIn: "30d"
    });
}

export default generalJWT;