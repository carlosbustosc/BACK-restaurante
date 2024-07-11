/*----como es con mogo importamos mongoose--------*/
//enviar
const mongoose = require('mongoose');

/*--------creamos la conexion-----*/
const conexion = async() => {

    try{

      
    
        mongoose.connect('mongodb+srv://CABUSTOSC09:Ecoutores09@haltfone.to2o8np.mongodb.net/restaurante?retryWrites=true&w=majority&appName=haltfone');
        console.log("conectado correctamente a MONGO ATLAS");

    }catch(error){

        console.log(error);
        

    }

}


module.exports = { conexion };