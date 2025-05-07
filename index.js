//traemos la conexion
const { conexion } = require('./BaseDatos/conexion');
conexion();


//configurar express
const express     = require('express');
const usarExpress = express();

//configurar json
usarExpress.use( express.json() );

//configurar url encoded
usarExpress.use( express.urlencoded({ extended:true }) );

//configurara cors
const cors = require('cors');
usarExpress.use( cors () );


//crear servidor local
usarExpress.listen(5000, () => {
    console.log("se esta ejecutando en el puerto 5000");
})


//incorporamos las rutas
const rutasClientes = require('./rutas/clientes');
usarExpress.use(rutasClientes);