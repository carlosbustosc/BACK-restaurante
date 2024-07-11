/*--importar schema . model de moongose--*/
const { Schema, model } = require('mongoose');


//creamos el modelo schema
const modeloFavoritos = Schema( {

    foto: {
        type:String,
        require:true
    },
    nombre: {
        type:String,
        require:true
    },
    ciudad: {
        type:String,
        require:true
    },
    visitarRestaurante:{
        type:String,
        require:true
    },
    descripcion:{
        type:String,
        require:true
    },
    email: {
        type:String,
        require:true
    },
    emailPersona:{
        type:String,
        require:true
    },
    fecha: {
        type:Date,
        default:Date.now
    }

})


module.exports = model( "registrarFavoritos", modeloFavoritos, "registroFavoritos" );