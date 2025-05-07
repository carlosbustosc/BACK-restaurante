//usamos mongoose para la conexion
const mongoose  = require('mongoose');

//realizar conexion
const conexion = async () => {

    try{

        await mongoose.connect('mongodb://localhost:27017/Estudiar');
        console.log("Se ha conectado correctamente a la base de datos");

    }catch{

        console.log("no se ha podido conectar correctamente a la base de datos");
    }

}

module.exports = {

    conexion
}