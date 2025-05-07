
const validator          = require('validator');
const modeloNotificacion = require("../modelos/notificaciones");


guardarNotificaciones = ( req, resp ) => {


const datosFront = req.body;

    //console.log(datosFront)

    //resgitrar notificacion    


    const modeloDB = new modeloNotificacion( datosFront )
    modeloDB.save()
        .then( ( notificacionDB ) => {
            
            return resp.status(200).json({
                status: "success",
                mensaje:" La notificacion fue registrada correctamente",
                datosRegistro: notificacionDB
            })
        })
            

}


traerGestionados = (req, resp) => {

    const datosFront = req.params;
    //console.log(datosFront)


    modeloNotificacion.find()
        .then( (gestionadosDB) => {
                
            if( gestionadosDB.length == 0 ){

                return resp.status(400).json({
                    error: "error",
                    mensaje:"No se encontro registros de: " + datosFront.estado
                })

            }

            console.log(gestionadosDB)
            
            return resp.status(200).json({
                status:"correcto",
                mensaje: "se encontraron registros para :" + datosFront.estado,
                registros: gestionadosDB
            })

            

        })
        .catch( (error) =>{
            return resp.status(400).json({ mensaje : error })
        })

}


eliminarGestionado = (req, resp) => {

    datosFront = req.params.id;
    

    modeloNotificacion.findOneAndDelete( { _id:datosFront } )
        .then( (datosDB) => {
            if( !datosFront ){
                return resp.status(400).json({
                    mensaje:"El registro no existe"
                })
            }

            return resp.status(200).json({
                status:"success",
                mensaje:"el registro se ha borrado correctamente",
                datosDB

            })
        } )


}



listarNotificacionesAlCliente = (req, resp) => {

    modeloNotificacion.find()
        .then( ( todasLasNotificaciones ) => {

            if( todasLasNotificaciones.length == 0){
                return resp.status(400).json({

                    mensaje: "no existen notificaciones"
                })
            }

            return resp.status(200).json({
                status:"success",
                mensaje: "se ha encontrado las notificaciones",
                todasLasNotificaciones

            })

        })

}


borrarNotificacionCliente = (req, resp) => {

    const datosFront = req.params;
    console.log( datosFront )


    //borrar notificacion
    modeloNotificacion.findOneAndDelete( { _id : datosFront.id } )
        .then( (registroDB) => {

            if( !registroDB ){
                return resp.status(400).json({ mensaje: "el registro no existe" })
            }

            return resp.status(200).json({
                status:"success",
                mensaje: "Se ha borrado correctamente el registro",
                registroDB
            })
        })

}


module.exports = {

    guardarNotificaciones,
    traerGestionados,
    eliminarGestionado,
    listarNotificacionesAlCliente,
    borrarNotificacionCliente

}