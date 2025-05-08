
//importamos jwt-simple , moments
const JWT = require('jwt-simple');
const moment   = require('moment');

//clave
const clave = "Ecoutores09";


//funcion con datos
const datosCliente = ( datosDB ) => {

        const datosRegistro = {

            nombre  : datosDB.nombre,
            email   : datosDB.email,
            pass    : datosDB.pass,
            celular : datosDB.celular,
            departamento : datosDB.departamento,
            ciudad : datosDB.ciudad,
            barrio: datosDB.barrio,
            direccion : datosDB.direccion,
            fechaPublicacion: datosDB.fechaPublicacion,
            creacion: moment().unix(),
            caducidad: moment().add(90, 'days').unix

        }

    return JWT.encode( datosRegistro,  clave);

}


module.exports = { datosCliente };
