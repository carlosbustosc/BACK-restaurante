//importar validator para las validaciones

const validator = require('validator');


//importamos el modelo
const modeloComentarios = require('../modelos/comentarios')



const registrarComentario = (req, resp) => {


    const datosFront = req.body;
    
    //validaciones
    const nombre            = !validator.isEmpty( datosFront.nombre );
    const correo            = !validator.isEmpty( datosFront.correo );
    const comentario        = !validator.isEmpty( datosFront.comentario );
    const correoRestaurante = !validator.isEmpty( datosFront.correoRestaurante );

    if( !nombre || !correo || !comentario || !correoRestaurante ){

        return resp.status(400).json({
            status: "error",
            mensaje : "Hay algun campo vacio"
        })
    }
    
    
    

        // guardar comentario
        const modeloRegistrarComentario = new modeloComentarios( datosFront )

        modeloRegistrarComentario.save()
            .then( (nuevoRegistro) => {

                return resp.status(200).json({
                    status:"success",
                    mensaje:"Su comentario ha sido registrado exitosamente",
                    registro: nuevoRegistro

                })

            })
  
   


}


const borrarComentario = (req, resp) => {

    const datosFront = req.params.id;
    console.log(datosFront);

    modeloComentarios.findOneAndDelete( { _id : datosFront } )
        .then( (datoBorrado) => {
            if( !datosFront ){
                return resp.status(400).json({
                    mensaje: "El dato no existe"
                })
            }

            return resp.status(200).json({
                mensaje:"El comentario se borrado correctamente",
                datoBorrado
            })
        } )

}

const cargarComentarios = (req, resp) => {

    modeloComentarios.find()
        .then( (todosLosComentarios) => {

            if( todosLosComentarios && todosLosComentarios.length == 0){

                return resp.status(400).json({ mensaje:"no hay comentarios" })
            }

            return resp.status(200).json({
                mensaje: "se han encontrado comentarios",
                todosLosComentarios
            })
        })
}


module.exports = {
    registrarComentario,
    borrarComentario,
    cargarComentarios
}