// importamos mongose
const mongoose = require('mongoose');

//hacemos la conexion
const conexion = async() => {

    try{

        await mongoose.connect('mongodb://localhost:27017/Estudiar');
        console.log("se ha conectado correctemente a la base de datos");

    }catch{
        
        console.log("Error: no se pudo conecar a la base de datos");
    }
}


//exportamos la conexion
module.exports = { 
    conexion 
}
