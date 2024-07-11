//------------importar JWT--------
const JWT = require('jwt-simple');
const moment = require('moment');


//clave secreta
const claveSecreta = "Ecoutores09**"



// construir funcion de Token
const tokenRestaurante = (datosDB) => {

    const datosResturante = {

        nombreRestaurante: datosDB.nombreRestaurante,
        foto:datosDB.foto,
        descripcion:datosDB.descripcion,
        departamento:datosDB.departamento,
        ciudad:datosDB.ciudad,
        direccion:datosDB.direccion,
        Telefono:datosDB.Telefono,
        email:datosDB.email,
        pass:datosDB.pass,
        categoria: datosDB.categoria,
        platosEspeciales: datosDB.platosEspeciales,
        bebidas:datosDB.bebidas,
        entradas:datosDB.entradas,
        fecha:datosDB.fecha,
        creacion: moment().unix(),
        finalizacion: moment().add(90, "days").unix

    }

    return JWT.encode(datosResturante, claveSecreta)

}


module.exports = {
    tokenRestaurante
}