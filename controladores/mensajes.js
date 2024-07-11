
const validator = require('validator');

//modelo restuarntes
const modeloMensajes = require('../modelos/mensajes');

//modeloClientes
const modeloMensajesClientes = require("../modelos/mensajeClientes")



guardarMensajesResturantes = (req, resp) => {

  
    const datosFront = req.body;
    console.log(datosFront)

    const emailCliente = !validator.isEmpty( datosFront.emailCliente );
    const emailResturante = !validator.isEmpty( datosFront.emailResturante );
    const mensajeDeResturante = !validator.isEmpty( datosFront.mensajeDeResturante );
    const nombreRestaurante = !validator.isEmpty( datosFront.nombreRestaurante );
    
    

    if( !emailCliente || !emailResturante  || !mensajeDeResturante || !nombreRestaurante){

        return resp.status(400).json('uno de los campos viene vacio');
    }

    const crearModelo = new modeloMensajes(datosFront)
    crearModelo.save()
        .then( ( mensajeDB ) => {
            
            return resp.status(200).json({
                status:"sucess",
                mensaje:"El mensaje se ha registrado correctamente",
                mensajeDB

            })
            
        })
}


guardarMensajeClientes = (req, resp) => {

    const datosFront = req.body;
    console.log(datosFront)

    const emailCliente = !validator.isEmpty( datosFront.emailCliente );
    const emailResturante = !validator.isEmpty( datosFront.emailResturante );
    const mensajeDecliente = !validator.isEmpty( datosFront.mensajeDecliente );
    const nombreRestaurante = !validator.isEmpty( datosFront.nombreRestaurante );
    
    

    if( !emailCliente || !emailResturante  || !mensajeDecliente || !nombreRestaurante){

        return resp.status(400).json('uno de los campos viene vacio');
    }

    const crearModelo = new modeloMensajesClientes(datosFront)
    crearModelo.save()
        .then( ( mensajeDB ) => {
            
            return resp.status(200).json({
                status:"sucess",
                mensaje:"El mensaje se ha registrado correctamente",
                mensajeDB

            })
            
        })

}



listarMensajesClientes = (req, resp) => {

    modeloMensajesClientes.find()
        .then( (mensajesDB) => {
            

            if( mensajesDB && mensajesDB.length == 0){
                return resp.status(400).json({
                    mensaje: "no hay mensajes disponibles"
                })
            }

            console.log(mensajesDB)

            return resp.status(200).json({
                mensaje: "hay mensajes disponibles",
                mensajesDB
            })
       
        })


}



listarMensajesRestaurantes = (req, resp) => {

    const datosFront = req.params.correo


    modeloMensajes.find( { emailCliente : datosFront } )
        .then( (mensajesDB) => {
            
            if( mensajesDB && mensajesDB.length == 0){
                return resp.status(400).json({
                    mensaje: "no hay mensajes disponibles"
                })
            }

            console.log(mensajesDB)

            return resp.status(200).json({
                mensaje: "hay mensajes disponibles",
                mensajesDB
            })
       
        })


}




borrarMensajeRestaurante = (req, resp) => {

    const datosFront = req.params;
    console.log(datosFront)

    modeloMensajes.findOneAndDelete( { _id : datosFront.id } )
        .then( (mensajeUsuarioDB) => {

            if( !mensajeUsuarioDB ){
                return resp.status(400).json({
                    status: "success",
                    mensaje:"El mensaje no existe",
                    mensajeUsuarioDB
                })
            }
        
            return resp.status(200).json({

                mensaje: "se ha borrado exitosamente"
            })


        })
}


//se ejecuta en perfil resturante
borrarMensajesCliente = (req, resp) => {

    const datosFront = req.params;
    console.log( datosFront.id );
    

    modeloMensajesClientes.findOneAndDelete( { _id : datosFront.id })
        .then( ( mensajeDB ) => {

            if( !mensajeDB ){
                
                return resp.status(400).json({
                    status:"error",
                    mensaje:"no se ha encontrado el registro"
                })
            }


            return resp.status(200).json({
                status:"success",
                mensaje:"Se elimino correctamente el registro",
                mensajeDB
            })



        })
}


module.exports = {

    guardarMensajesResturantes,
    listarMensajesClientes,
    guardarMensajeClientes,
    borrarMensajeRestaurante,
    listarMensajesRestaurantes,
    borrarMensajesCliente


}