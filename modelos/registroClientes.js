
//-----traemos el Schema y el model de mongoose
const { Schema, model } = require('mongoose');

//---creamos el modelo schema
const modeloRegistroClientes = Schema({


    nombre:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required:true
    },
    pass:{
        type:String,
        required:true
    },
    pass2:{
        type:String,
        required:true
    },
    celular:{
        type:String,
        required:true
    },
    departamento:{
        type:String,
        required:true
    },
    ciudad:{
        type:String,
        required:true
    },
    barrio:{
        type:String,
        required:true
    },
    direccion:{
        type:String,
        required:true
    },
    fecha:{
        type:Date,
        default:Date.now
    }
})


//----esportamos el modelo schema
module.exports = model("registroClientes", modeloRegistroClientes, "clientesRegistrados");
