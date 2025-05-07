
//---traemos el Schema y model
const { Schema, model } = require('mongoose');

//creamos el eschema
const regisClientes = Schema({

    nombre:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    pass:{
        type:String,
        require:true
    },
    celular:{
        type:String,
        require:true
    },
    departamento:{
        type:String,
        require:true
    },
    ciudad:{
        type:String,
        require:true
    },
    barrio:{
        type:String,
        require:true
    },
    direccion:{
        type:String,
        require:true
    },
    fechaPublicacion:{
        type:Date,
        default:Date.now
    }

})

//exportamos el modulo
module.exports = model('clientes.js', regisClientes, 'registroClientes');
