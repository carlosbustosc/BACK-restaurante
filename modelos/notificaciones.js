const { Schema, model } = require('mongoose');

//crear scheme

const modeloNotificaciones = Schema({

    nombreCliente:{
        type:String,
        require:true
    },
    correoCliente:{
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
    direccionCliente:{
        type:String,
        require:true
    },
    fechaDomicilio:{
        type:String,
        require:true
    },
    pedido:{
        type:Array,
        require:true
    },
    correoCliente:{
        type:String,
        require:true
    },
    notificacion:{
        type:String,
        require:true
    },
    estado:{
        type:String,
        require:true
    },
    fecha:{
        type:Date,
        default:Date.now
    }

})


module.exports = model( "notificaciones.js", modeloNotificaciones, "notificacionesParaCliente" )