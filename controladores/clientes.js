
//importar el modelo

const validator = require('validator')
const modeloRegistrarClientes = require('../modelos/clientes');

//bcrypt para cifrar contraseña
const bcrypt = require('bcrypt');








//creamos el primer controlador
const registrarClientes = (req, resp) => {

    
    const datosFront = req.body
    //verificar que llegue la infromacion completa
    const nombre        =  !validator.isEmpty( datosFront.nombre ); // no esta vacio
    const email         =  !validator.isEmpty( datosFront.email );
    const pass          =  !validator.isEmpty( datosFront.pass );
    const celular       =  !validator.isEmpty( datosFront.celular );
    const departamento  =  !validator.isEmpty( datosFront.departamento );
    const ciudad        =  !validator.isEmpty( datosFront.ciudad );
    const barrio        =  !validator.isEmpty( datosFront.barrio );
    const direccion     =  !validator.isEmpty( datosFront.direccion );

    if(!nombre || !email || !pass || !celular || !departamento || !ciudad || !barrio || !direccion){

        return resp.status(400).json({
            status:"error",
            mensaje: "alguno de los campos esta vacio"
        })

    }

    //verificamos si existe el clientes
    modeloRegistrarClientes.find({
        $or:[
            { email : datosFront.email }
        ]
    }).then( registroDB => {
        
    
        if( registroDB ){

            return resp.status(400).json({
                error : "El registro ya existe en la base de datos",
                existente: registroDB
            })
        }
   


        //ciframos la contraseña
        bcrypt.hash(  datosFront.pass, 10, (error, claveCifrada) => {
            
            datosFront.pass = claveCifrada;


            //guardamos el registro
            const nuevoModelo = new modeloRegistrarClientes(datosFront)

            nuevoModelo.save()
                .then( respRegistro => {

                    return resp.status(200).json({
                        status:"success",
                        mensaje:"se ha registrado correctamente",
                        registro: respRegistro
                        
                    })

                })

        })

    }) // fin then

   

}


module.exports = {

    registrarClientes

}