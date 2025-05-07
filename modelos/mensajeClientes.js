const { Schema, model } = require('mongoose');

const modeloMensajes2 = Schema({

    emailCliente: {
        type:String,
        require:true
    },
    emailResturante: {
        type:String,
        require:true
    },
    mensajeDecliente:{
        type:String,
        require:true
    },
    nombreRestaurante: {
        type:String,
        require:true
    },
   nombreCliente:{
    type:String,
    require:true
   },
    fecha:{
        type:Date,
        default:Date.now
    }

})


module.exports = model("mensajeClientes", modeloMensajes2, "mensajesClientes");