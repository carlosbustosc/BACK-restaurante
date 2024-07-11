//------importar validator
const validator = require('validator');

//-----traer modelo de regitro de clientes
const modeloCliente = require('../modelos/registroClientes');

//tremos modelo foto perfil
const modeloFotoPerfil = require('../modelos/fotoPerfil')

//cifrar contrasena
const bcrypt = require('bcrypt')



const traerUnPerfil = (req, resp) => {

    const IDfront = req.body.correo;
    //console.log("datosEmail:" + IDfront)

    if( IDfront == ""){

        return resp.status(400).json({
            status:"error",
            mensaje:"El campo esta vacio"
        })
    }
    
    //----buscar registro por id
    modeloCliente.findOne( { email:IDfront } )
        .then( ( respuestaRegistro ) => {

            //console.log(respuestaRegistro)
            
            if( !respuestaRegistro ){
                
                return resp.status(400).json({
                    status:"error",
                    mensaje: "El registro no existe"
                })
            }

            return resp.status(200).json({
                status:"success",
                mensaje : "el registro con correo " + respuestaRegistro.
                email + " existe",
                datosPerfil: respuestaRegistro
            })
           
        }).catch( ( error ) => {
            
            return resp.status(400).json({
                status:"error",
                mensaje:error
            })
        
        })
        

}



const registrarfotoPerfil = (req, resp) => {

    const datosFront = req.body;

    //console.log( datosFront )

    const correo  = !validator.isEmpty( datosFront.correoF );
    const foto    = !validator.isEmpty( datosFront.fotoF );


    if( !correo || !foto ){

        return resp.status(400).json({
            mensaje: "falta inforamcion por enviar, si no esta completa no se puede registrar"
        })
    }
    

    const registroFotoPerfil = new modeloFotoPerfil( datosFront ); //enviar datos al modelo

    registroFotoPerfil.save()
        .then( (registroFoto) => {
           
            return resp.status(200).json({

                mensaje:"Se ha guarado la imagen correctamente en formato base 64",
                datosFoto: registroFoto
            })
        })
          

}



const listarFotoPerfil = (req, resp) => {

    const datosFront = req.body;
    //console.log(datosFront)

    //---consuktar por correo y taer foto
    modeloFotoPerfil.findOne( { correoF: datosFront.correo  }) 
        .then( (respDB) => {
            //console.log(respDB)

            return resp.status(200).json({
                mensaje:"Se encontro la foto",
                datosFoto: respDB

            })
        } )
    
}


const actualizarInformacionPerfil = (req, resp) => {
    
    const datosFront = req.body;
    
    const nombreValidar = !validator.isEmpty( datosFront.nombre );
    const emailValidar = !validator.isEmpty( datosFront.email );
    const passValidar = !validator.isEmpty( datosFront.pass );
    const celularValidar = !validator.isEmpty( datosFront.celular );
    const departamentoValidar = !validator.isEmpty( datosFront.departamento );
    const ciudadValidar = !validator.isEmpty( datosFront.ciudad );
    const barrioValidar = !validator.isEmpty( datosFront.barrio );
    const direccionValidar = !validator.isEmpty( datosFront.direccion );
    
    if( !nombreValidar || !emailValidar || !passValidar || !celularValidar || !departamentoValidar || !ciudadValidar || !barrioValidar || !direccionValidar){

        return resp.status(400).json({
            mensaje:"alguno de los campos esta vacio"
        })
    }

    
    

    //--ya una vez validado Actulizamos informacion
    bcrypt.hash(  datosFront.pass, 10,  (error, cifrarPASS)  => {

        datosFront.pass = cifrarPASS


        //actualizamos
        modeloCliente.findOneAndUpdate( { email: datosFront.email },  datosFront)
        .then( ( registroDB ) => { // sin existe

            if( !registroDB ){

                return resp.status(400).json({
                    mensaje:"No se puede actualizar porque no existe el registro"
                })
            }
            
            return resp.status(200).json({
                status:"success",
                mensaje : "Se ha actualizado correctamente el usuario " + registroDB.email,
                registroDB
            })
        })  
      
    })

    
}






module.exports = {
    
    traerUnPerfil,
    registrarfotoPerfil,
    listarFotoPerfil,
    actualizarInformacionPerfil,
  

}