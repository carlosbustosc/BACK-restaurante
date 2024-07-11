// importar schema y model---
const { Schema, model } = require('mongoose');


//creamos schema
const registroRestaurante = Schema({

    nombreRestaurante: {
        type:String,
        required:true
    },
    foto:{
        type:Array,
        required:true
    },
    descripcion:{
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
    direccion:{
        type:String,
        required:true
    },
    Telefono:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    pass:{
        type:String,
        required:true
    },
    categoria:{
        type:String,
        required:true
    },
    platosEspeciales:{
        type:Array,
        required:true
    },
    bebidas:{
        type:Array,
        required:true
    },
    entradas:{
        type:Array,
        required:true
    },
    fecha:{
       type:Date,
        default:Date.now
    }

})

module.exports = model("registroRestaurante", registroRestaurante, "restaurantesRegistrados")
