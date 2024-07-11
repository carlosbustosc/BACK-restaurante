/*----como es con mogo importamos mongoose--------*/
const mongoose = require('mongoose');

/*--------creamos la conexion-----*/
const conexion = async() => {

    try{

        mongoose.connect('mongodb://localhost:27017/restaurante');
        console.log("conectado correctamente");

    }catch(error){

        console.log(error);
        

    }

}


module.exports = { conexion };