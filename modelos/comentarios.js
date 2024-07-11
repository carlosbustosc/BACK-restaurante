// importar mongoose para Schema y model
const { Schema, model } = require('mongoose');


//creamos schema
const modeloComentarios = Schema({

    nombre:{
        type:String,
        require:true
    },
    correo:{
        type:String,
        require:true
    },
    comentario:{
        type:String,
        require:true
    },
    correoRestaurante:{
        type:String,
        require:true
    },
    fechaComentario:{
        type:Date,
        default:Date.now
    }

})


//exportamos y creamos el modelo
module.exports = model("comentarios", modeloComentarios, "registroComentarios");