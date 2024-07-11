const { Schema, model } = require('mongoose');

const modeloMensajes = Schema({

    emailCliente: {
        type:String,
        require:true
    },
    emailResturante: {
        type:String,
        require:true
    },
    mensajeDeResturante:{
        type:String,
        require:true
    },
    nombreRestaurante: {
        type:String,
        require:true
    },
    fecha:{
        type:Date,
        default:Date.now
    }

})


module.exports = model("mensajes", modeloMensajes, "mensajesTodos");