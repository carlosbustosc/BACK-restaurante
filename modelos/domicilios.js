//-----importamos mongoose, schema y model------
const { Schema, model } = require('mongoose');


//contruimos el schema , el modelo
const modeloDomicilios = Schema({

    idRestaurante:{
        type:String,
        require: true
    },
    emailRestaurante:{
        type:String,
        require:true
    },
    correoCliente:{
        type:String,
        require:true
    },
    fecha:{
        type:String,
        require:true
    },
    imagen:{
        type:String,
        require:true
    },
    nombreCliente:{
        type:String,
        require:true
    },
    nombreRestaurante:{
        type:String,
        require:true
    },
    pedido:{
        type:Array,
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
        type:Date,
        default:Date.now
    }

})


module.exports = model("domicilios", modeloDomicilios, "domiciliosAgendados");