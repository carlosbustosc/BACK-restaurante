
//importar el modelo

const validator = require('validator')
const modeloRegistrarClientes = require('../modelos/clientes');

//bcrypt para cifrar contraseña
const bcrypt = require('bcrypt');



//importamos archivo token
const ArchivoToken =  require('../tokenss/clientes');








//creamos el primer controlador
const registrarClientes = (req, resp) => {

    
    const datosFront = req.body
    //console.log(datosFront);
    //verificar que llegue la infromacion completa
    const nombre        =  !validator.isEmpty( datosFront.nombre ); // no esta vacio
    const email         =  !validator.isEmpty( datosFront.email );
    const pass          =  !validator.isEmpty( datosFront.pass );
    const celular       =  !validator.isEmpty( datosFront.celular );
    const departamento  =  !validator.isEmpty( datosFront.departamento );
    const ciudad        =  !validator.isEmpty( datosFront.ciudad );
    const barrio        =  !validator.isEmpty( datosFront.barrio );
    const direccion     =  !validator.isEmpty( datosFront.direccion );

    if(!nombre || !email || !pass || !celular || !departamento || !ciudad || !barrio || !direccion ){
        
        return resp.status(400).json({

            status:"error",
            mensaje:"Uno de los campos viene vacio"
        })
    }
    

    //verificar si existe
    modeloRegistrarClientes.findOne({
        $or:[
             {email: datosFront.email }
        ]
    }).then( respRegistro =>  {

        if(respRegistro){

            return resp.status(400).json({
                status:"error",
                mensaje:"El registro ya existe en la base de datos prueba"
            })
        }

        // si no existe el registro ahora si vamos a registrarlo
        bcrypt.hash( datosFront.pass, 8, (error, claveCifrada) => {

            datosFront.pass = claveCifrada;


            //ya cifrando la clave guardamos el registro
            const modeloNuevo = modeloRegistrarClientes(datosFront);
            
            modeloNuevo.save()
                .then( registroCliente => {

                    console.log(registroCliente)

                    return resp.status(200).json({
                        status:"success",
                        nuevoRegistro: registroCliente
                    })

                })
        })

    })
    


   

}


const loginClientes = (req, resp) => {

        datosFront = req.body;

        const usuario  = !validator.isEmpty( datosFront.usuario ); // estab llenos
        const password = !validator.isEmpty( datosFront.password );
        
        if( !usuario || !password ){

            return resp.status(400).json({
                status:"error",
                mensaje:"Falta uno de los registros"
            })
        }

        //verificar si el email no existe
        modeloRegistrarClientes.findOne( { email:datosFront.usuario } )
            .then( respEmail =>  {
                
                console.log(respEmail)

                if( !respEmail ){

                    return resp.status(400).json({
                        status:"error",
                        mensaje:"El email no existe"
                    })
                }

                //si existe el email pasamos a verificar la contraseña
                const compararContrasenas = bcrypt.compareSync( datosFront.password, respEmail.pass );

                if( !compararContrasenas ){

                    return resp.status(400).json({
                        status:"error",
                        mensaje:"las contraseña no coincide"
                    })
                }


                //si email es exitoso y la contrasela tambien enviamos el token
                const nuevoToken = ArchivoToken.datosCliente( respEmail );

                //enviamos mensaje
                return resp.status(200).json({
                    status:"success",
                    mensaje:"El usuario se ha validado correctamente",
                    token: nuevoToken
                })



            })

       

       


}


const ActualizarUsuario = (req, resp) => {

   const datosFront = req.body;

   const nombre       =  !validator.isEmpty( datosFront.nombre ); // si viene llenos
   const email        =  !validator.isEmpty( datosFront.email );
   const pass         =  !validator.isEmpty( datosFront.pass );
   const celular      =  !validator.isEmpty( datosFront.celular );
   const departamento =  !validator.isEmpty( datosFront.departamento );
   const ciudad       =  !validator.isEmpty( datosFront.ciudad );
   const barrio       =  !validator.isEmpty( datosFront.barrio );
   const direccion    =  !validator.isEmpty(  datosFront.direccion );

   if( !nombre ||  !email || !pass || !celular || !departamento || !ciudad || !barrio || !direccion){

        return resp.status(400).json({
            status:"error",
            mensaje:"Falta uno de los campos"
        })

   }



    // si estan todos los campos completos se procede a actualizar
   bcrypt.hash( datosFront.pass, 8, (err, claveCifrada) => {

    datosFront.pass = claveCifrada

    //actualizamos
    modeloRegistrarClientes.findOneAndUpdate( { email : datosFront.email }, datosFront )
        .then( datosActualizados => {

            if( !datosActualizados ){// no existe el registro

                return resp.status(400).json({
                    status:"error",
                    mensaje:"No hay un correo registrado para actualizar la informacion"
                })
            }


            //existe el dato
            return resp.status(200).json({
                status:"success",
                mensaje:"Se ha actualizado correctamente",
                actualizacion : datosActualizados
            })

        })

   })

    

}



module.exports = {

    registrarClientes,
    loginClientes,
    ActualizarUsuario

}