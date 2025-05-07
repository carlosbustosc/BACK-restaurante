// incluir validacion
const validator = require('validator');

// traemos el modelo
const modeloRestaurante = require('../modelos/registroRestaurante');


//importamos bcrypt para cifrar contraseña
const bcrypt = require('bcrypt');


//importamos el token
const archivoToken = require('../tokens/tokenRestaurante')



const registrarRestaurante = (req, resp) => {

    const datosRestaurante = req.body;
    console.log(datosRestaurante);

    
    let validarNombre         = !validator.isEmpty( datosRestaurante.nombreRestaurante )
    
    //let validarFoto           = !validator.isEmpty( datosRestaurante.foto )
    let validarFoto           = !Array.isArray(datosRestaurante.foto) && datosRestaurante.foto.length > 0; // array

    let validarDescripcion    = !validator.isEmpty( datosRestaurante.descripcion )
    let validarDepartamento   = !validator.isEmpty( datosRestaurante.departamento )
    let validarCiudad         = !validator.isEmpty( datosRestaurante.ciudad )
    let validarDireccion      = !validator.isEmpty( datosRestaurante.direccion )
    let validarTelefono       = !validator.isEmpty( datosRestaurante.Telefono )
    let validarEmail          = !validator.isEmpty( datosRestaurante.email )
    let validarPass           = !validator.isEmpty( datosRestaurante.pass )
    let validarCategoria      = !validator.isEmpty( datosRestaurante.categoria )
    
    let validarPlatos         = !Array.isArray(datosRestaurante.platosEspeciales) && datosRestaurante.platosEspeciales.length > 0; // array
    let validarBebidas        = !Array.isArray(datosRestaurante.bebidas) && datosRestaurante.bebidas.length > 0; // array




    if( !validarNombre ||  !validarDescripcion || !validarDepartamento || !validarCiudad || !validarDireccion || !validarTelefono || !validarEmail || !validarPass || !validarCategoria || validarPlatos || validarBebidas || validarFoto){

        return resp.status(400).json({
            status:"Error",
            mensaje : "Uno de los campos esta vacio"
        })

    }


    //-------verificamos que no exista en la base de datos
    modeloRestaurante.find( {
        $or:[
            { email: datosRestaurante.email }
        ]
    
    }).then( (datosDB) => {

         //console.log(datosDB)
         if(datosDB && datosDB.length > 0){// comprobar si existe

            return resp.status(400).json({
                status: "error",
                mensaje:"El registro ya existe en nuestra base de datos"
            }) 
         }

         // si no existe el dato ciframos contraseña
         bcrypt.hash( datosRestaurante.pass, 10, (error, passCifrada) => {

            datosRestaurante.pass = passCifrada

            //guardamos registro
            const modeloRegistrarResturante = new modeloRestaurante(datosRestaurante);
            
            modeloRegistrarResturante.save()
                .then( (datosRestaurante) => {

                    return resp.status(200).json({
                        status:"success",
                        mensaje:"El restaurante se ha registrado correctamente",
                        datosRestaurante: datosRestaurante
                    })

                })
                .catch( ( posibleError ) => {
                    return resp.status(400).json({
                        status:"error",
                        mensaje:"Hubo un error",
                        error: posibleError
                    })
                } )
         
        })

    }).catch( ( error ) => {
        
        return resp.status(400).json({
            errorDeGuardado: error
        })
    })
        

}



const loginRestaurante = (req, resp) => {

    const DatosloginRestaurante = req.body;
    
    const validarCorreo = !validator.isEmpty(  DatosloginRestaurante.correo );
    const validarPass   = !validator.isEmpty( DatosloginRestaurante.pass );

    if( !validarCorreo ||  !validarPass ){

        return resp.status(400).json({
            mensaje:"Alguno de los datos esta vacio"
        })
    }



   //validamos si el correo existe
   modeloRestaurante.findOne( { email: DatosloginRestaurante.correo } )
        .then( (datosRegistro) => {//trae la informacion de ese registro correspondiente al correo
            
            if( !datosRegistro ){// si no existe

                return resp.status(400).json({
                    error:"error",
                    mensaje:"El correo o usuario no existe en la base de datos"
                })
            }

            //descifrar contraseña
           const compraraContrasena = bcrypt.compareSync( DatosloginRestaurante.pass, datosRegistro.pass );
           if( !compraraContrasena ){

            return resp.status(400).json({
                status:"error",
                mensaje:"La contraseña no es valida o no corresponde a la guardada en el registro",
                
            })
           
           }

           
           //crear Token y Enviar respuesta de Bienvenida
            const TokenResturante = archivoToken.tokenRestaurante(datosRegistro)


            return resp.status(200).json({
                status: "success",
                mensaje:"Hola Bienvenido a tu perfil " + datosRegistro.nombreRestaurante,
                TokenResturante,
                DatosPerfil: datosRegistro

            })

        })

}





// filtrar por todos los restaurantes //
const traerRestaurantes = (req, resp) => {



    const categoriaComida       = req.query.Comida;
    const categoriaDepartamento = req.query.Departamento
    const categoriaCuidad       = req.query.ciudad;


    let filtro = {}

    //---------EL CAMPO QUE ESXISTA SE VA CONSULTANDO---//
    if(categoriaComida){

        filtro.categoria = categoriaComida  // filtro.categoria --- categoria es de la DB
    }

    if(categoriaDepartamento){

        filtro.departamento = categoriaDepartamento
    }

    if(categoriaCuidad){
        filtro.ciudad = categoriaCuidad
    }

    
    //console.log(filtro);

    modeloRestaurante.find(filtro)
        .then(respDB => {
            if (respDB.length === 0) {
                return resp.status(400).json({
                    error: "error",
                    mensaje: "No hay restaurantes registrados con esa categoria"
                });
            }
    
            return resp.status(200).json({
                status: "success",
                mensaje: "Se encontraron registros a tu petición",
                respDB
            });
        });
    


}

// Un soilo restaurante
const traerUnRestaurante = (req, resp) => {

    let datosFront  = req.params.id;
    console.log(datosFront);

    let identificador = !validator.isEmpty(datosFront);

    if(identificador == ""){

        return resp.status(400).json({
            mensaje:"No hay ningun id para consultar"
        })
    }

    modeloRestaurante.find({ _id:datosFront })
            .then( respDB => {

                if(!respDB){

                    return resp.status(400).json({
                        status:"error",
                        mensaje:"No hay resgitros para esta busqueda"
                    })
                }

                return resp.status(200).json({
                    status:"sucess",
                    mensaje:"Se encontro un registro para esta busqueda",
                    respDB
                })

            })

}



module.exports = {

    registrarRestaurante,
    loginRestaurante,
    traerRestaurantes,
    traerUnRestaurante
    
}


