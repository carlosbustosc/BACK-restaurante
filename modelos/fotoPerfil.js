// importas schema y model

const { Schema, model } = require('mongoose');


//contruir schema
const modeloFotoPerfil = Schema({

    correoF:{
        type:String,
        require:true
    },
    fotoF:{
        type:String
    },
    fechaCreacion:{
        type:Date,
        default:Date.now
    }

})


//exportamos modelo
module.exports = model("fotoPerfil",  modeloFotoPerfil, "registroFotoPerfil")


