//--importar validator
const validator = require('validator');

// importamos el modelo
const modeloRegistrarCliente = require('../modelos/registroClientes'); 


//importamos bcryp para cifrar la contraseña
const bcrypt = require('bcrypt');


//importamos el token
const token = require("../tokens/tokenClientes");


const registrarCliente = (req, resp) => {

   
   const datosFormularioFront = req.body;
    console.log(datosFormularioFront)

    //validar que los campos no esten vacios
    let validarNombre    =  !validator.isEmpty( datosFormularioFront.nombre ); // esta con el dato
    let validarEmail     =  !validator.isEmpty(  datosFormularioFront.email ); // esta con el dato
    let validarPass      =  !validator.isEmpty( datosFormularioFront.pass );
    let validarPass2     =  !validator.isEmpty( datosFormularioFront.pass2 );
    let validarCelular   =  !validator.isEmpty( datosFormularioFront.departamento );
    let validarBarrio    =  !validator.isEmpty( datosFormularioFront.barrio );
    let validarDireccion = !validator.isEmpty( datosFormularioFront.direccion )

    if(validarNombre && validarEmail && validarPass && validarPass2 && validarCelular && validarBarrio && validarDireccion){ // si no esta vacio

        //console.log("trae los datos completos")
    
    }else{

        return resp.status(400).json({

            mensaje: "faltan datos por enviar"
        })
    }

   
    //--verificamos en la base de datos si existe el registro
    modeloRegistrarCliente.find({
        $or: [
            { email: datosFormularioFront.email }
        ]
    })
    .then( (usuario) => { 
        
        if(usuario && usuario.length > 0){// si existe verificar que tenga mas de 0 letras

            return resp.status(400).json({
                mensaje: "El usuario " + datosFormularioFront.email + " ya existe"
            })
        }


        //----sino existe continuamos----

        // ciframos la contraseña
        bcrypt.hash(  datosFormularioFront.pass, 8, (error, clavecifrada) => {

            datosFormularioFront.pass = clavecifrada;
            datosFormularioFront.pass2 = clavecifrada;
        
            //guardamos registro
            const modeloRclientes = new modeloRegistrarCliente(datosFormularioFront);

            modeloRclientes.save()
                .then( (datosRegistro) => {

                    return resp.status(200).json({
                        mensaje: "El Usuario se ha registrado correctamente",
                        status: "success",
                        datos: datosRegistro
                    })


                })
        })



    }).catch( (err) => {

        return resp.status(400).json({
            status: "err",
            mensaje: error
        })
       
    })   
}





const loginClientes = (req, resp) => {

   const datosLogin = req.body;
   //console.log(datosLogin)

   const validarUsuario  = !validator.isEmpty( datosLogin.usuario ); // no esta vacio
   const validarPassword = !validator.isEmpty( datosLogin.password );

   if( !validarUsuario || !validarPassword){// ai alguno de los 2 esta vacio{}

        return resp.status(400).json({
            status:"error",
            mensaje: "Falta alguno de los Datos"
        })

   }


   //validamos si existe en la base de datos
   modeloRegistrarCliente.findOne( { email: datosLogin.usuario } )
            .then( (respDB) => { // si encuentra un registro con ese email, me lo trae
               
                if(!respDB){// si no existe el Email

                    return resp.status(400).json({
                        status:"error",
                        mensaje:"El correo no existe en nustra base de datos"
                    })
                }

                // si existe el email pasamos a validar la contraseña

                //comprar descifradas las contraseñas
                const CompararContrasenas = bcrypt.compareSync( datosLogin.password,  respDB.pass);

                if( !CompararContrasenas ){// si son diferentes

                    return resp.status(400).json({
                        status:"error",
                        mensaje:"La contraseña no es valida."
                    })
                }


                // si esta todo bien generar TOKEN y enviar respuesta de bienvenida
                const tokenGenerado = token.TokenCliente(respDB);

                return resp.status(200).json({
                    status:"success",
                    mensaje: "Hola " + respDB.nombre + " Bienvenido a tu perfil",
                    Token : tokenGenerado,
                    datosPerfil:  respDB
                })

                
            })

}






module.exports = {
    registrarCliente,
    loginClientes
}