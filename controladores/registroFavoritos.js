
// importar validacion
const validator = require('validator');

//importamos el modelo
const modeloFavoritos = require('../modelos/registrarFavoritos')


const registrarFavoritos = ( req, resp ) => {

    const datosFront = req.body;
  
   const validarFoto                =  !validator.isEmpty( datosFront.foto );
   const validarNombre              =  !validator.isEmpty( datosFront.nombre );
   const validarCiudad              =  !validator.isEmpty( datosFront.ciudad );
   const validarVisitarRestaurante  =  !validator.isEmpty( datosFront.visitarRestaurante );
   const validarDescripcion         =  !validator.isEmpty( datosFront.descripcion );
   const validarCorreo              =  !validator.isEmpty( datosFront.email )




   if( !validarFoto ||  !validarNombre || !validarCiudad || !validarVisitarRestaurante || !validarDescripcion || !validarCorreo ){
        
        return resp.status(400).json({
            mensaje: "Falta alguno de los campos"
        })
            
   }

   
   modeloFavoritos.find( {
        $or:[
            { email : datosFront.email }
        ]
   })
   .then( ( respuestDB ) => {

            if(respuestDB && respuestDB.length > 0){

               return resp.status(400).json({
                    status: "error",
                    mensaje: " ya se ha guardado como favoritos",
                    registroExistente: respuestDB
               })
            }

            //nuevo obtejo
            const registrarModelo = new modeloFavoritos(datosFront)

            registrarModelo.save()
                .then( ( registroGuardado ) => {

                    return resp.status(200).json({
                        status:"success",
                        mensaje: "se ha registrado correctamente",
                        datosRegistro: registroGuardado
                    })
                  
                })

                .catch( (error) => {

                    return resp.status(400).json({
                        status:"error",
                        mensaje: "Hubo un error al guardar",
                        error
                    })
                })
           
   })
    




}


const listarRestaurantesFavoritos = (req, resp) => {

    datosURL = req.params.email;

    const validarEmail = !validator.isEmpty( datosURL );
    if( !validarEmail ){
        
        return resp.status(400).json({
            mensaje:"No viene el registro"
        })
    }


    //entramos al modelo
    modeloFavoritos.find( { emailPersona :  datosURL} )
        .then( (usuarioDB) => {

                if( !usuarioDB ){

                    return resp.status(400).json({
                        mensaje: "No hay restaurantes como favoritos"
                    })
                }

                console.log(usuarioDB)

                return resp.status(200).json({
                    status: "success",
                    mensaje: "Estos son los resturantes favoritos del perfil",
                    usuarioDB
                })

        } )
}


const borrarUnFavorito = (req, resp) => {

    const datosFront = req.params.id;
    console.log(datosFront);

    if( !datosFront ){

        return resp.status(400).json({
            status:"error",
            mensaje: "Se requiere el id del restaurante"
        })
    }


    modeloFavoritos.findOneAndDelete( { _id: datosFront  } )
        .then( ( registroFavorito ) => {
            
            if( !registroFavorito ){

                return resp.status(400).json({
                    status:"error",
                    mensaje:"El restaurante no existe"
                })
            }

            return resp.status(200).json({
                status:"success",
                mensaje:"Se ha borrado correctamente",
                registroBorrado: registroFavorito
            })
        })

}


module.exports = {

    registrarFavoritos,
    listarRestaurantesFavoritos,
    borrarUnFavorito

}