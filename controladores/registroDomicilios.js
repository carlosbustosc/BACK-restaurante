//importar validator
const validator = require('validator');

//importamos modelo
const modeloDomicilio = require('../modelos/domicilios')



registrarDomicilio = (req, resp) => {

   datosFront = req.body;
   //console.log(datosFront)

   //validar datos

    const idRestaurante     = !validator.isEmpty( datosFront.idRestaurante );
    const emailRestaurante  = !validator.isEmpty( datosFront.emailRestaurante );
    const emailCliente      = !validator.isEmpty( datosFront.correoCliente );
    const fecha             = !validator.isEmpty( datosFront.fecha );
    const imagen            = !validator.isEmpty( datosFront.imagen );
    const nombreCliente     = !validator.isEmpty( datosFront.nombreCliente );
    const nombreRestaurante = !validator.isEmpty( datosFront.nombreRestaurante );
   
    //const pedido            =  !Array.isArray( datosFront.pedido ) && datosFront.pedido.length > 0;

    const ciudad            = !validator.isEmpty( datosFront.ciudad );
    const barrio            = !validator.isEmpty( datosFront.barrio );
    const direccionCliente  = !validator.isEmpty( datosFront.direccionCliente );

    if(!idRestaurante || !emailRestaurante || !emailCliente || !fecha || !imagen || !nombreCliente || !nombreRestaurante ||  !ciudad || !barrio || !direccionCliente){

        return resp.status(400).json({

            mensaje: "Uno de los campos esta vacio, la informacion tiene que estar completa"
        })
    }


    //registrar domicilio
    const modeloRegistroDomicilio =  new  modeloDomicilio(datosFront);

    modeloRegistroDomicilio.save()
        .then( (datos) =>{

            return resp.status(200).json({
                status:"success",
                mensaje: "El domicilio se ha registrado correctamente",
                datos
            })

        })
        .catch( (error) => {
            
            return resp.status(400).json({
                status:"error",
                mensaje: "Hubo un error al resgitrar el domicilio",
                error

            })
        } )
            

}




traerDomiciliosSegunElPerfil = (req, resp) => {

   const datosFront = req.body;
   console.log(datosFront)


   //consultar
   modeloDomicilio.find( { correoCliente: datosFront.correo } )
        .then( ( respDB ) => {
            
            if( !respDB ){

                return resp.status(400).json({
                    mensaje:"El resgitro domicilio no existe en la bse de datos"
                })
            }

            //existe
            return resp.status(200).json({
                status:"success",
                mensaje:"Domicilio encontrado",
                datos_perfil:respDB
            })
        })

}



borrarUnDomicilio = (req, resp) => {

    const datosFront = req.params;
    //console.log(datosFront)


    //----borrar domicilio
    modeloDomicilio.findOneAndDelete( { _id: datosFront.id } )
            .then( ( respDB ) => {

                if( respDB == null){

                    return resp.status(400).json({
                        mensaje:"La publicacion fue borrada anterormente"
                    })
            
                }


                return resp.status(200).json({
                    mensaje:"El domicilio se ha borrado correctamente",
                    publicacionBorrada: respDB
                })

            }).catch( (error) => {
                console.log(error)
            })

}


domiciliosParaPerfilRestaurante = (req, resp) => {


    const emailFront = req.params.email
    

    modeloDomicilio.find( { emailRestaurante: emailFront } )
        .then( (domiciliosDB) => {

            if( domiciliosDB.length == 0 ){
                
                return resp.status(400).json({
                    mensaje:"No hay domicilios agendados en este momento"
                })
            }

         
            return resp.status(200).json({
                mensaje: "Se han encontrado datos",
                datosDomicilios: domiciliosDB
            })

            
           
        })





}


module.exports = {

    registrarDomicilio,
    traerDomiciliosSegunElPerfil,
    borrarUnDomicilio,
    domiciliosParaPerfilRestaurante
}