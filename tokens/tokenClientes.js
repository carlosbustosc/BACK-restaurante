
/*---importamos jwt y moment--*/
const JWT     = require('jwt-simple');
const moment  = require('moment')

//generar clave secreta
const claveSecreta = "Ecoutores09**"



//crear funcion de TOKEN
const TokenCliente = ( datosDB ) => {

    const datosCliente = {

        nombre: datosDB.nombre,
        email: datosDB.email,
        pass: datosDB.pass,
        pass2 : datosDB.pass2,
        celular : datosDB.celular,
        departamento: datosDB.departamento,
        ciudad: datosDB.ciudad,
        barrio: datosDB.barrio,
        direccion: datosDB.direccion,
        fecha: datosDB.fecha

    }

    //encapsular informacion y enviarla
    return JWT.encode( datosCliente,  claveSecreta);

}


module.exports = {

    TokenCliente // exportamos el token comprimido con toda la informacion
}