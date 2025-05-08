//conectamos la conexion DB
const  { conexion }  = require('./BaseDatos/conexion');
conexion();



const express     = require('express');
const usarExpress = express();



usarExpress.use( express.json() );
usarExpress.use( express.urlencoded( { extended:true } ) )

const cors = require('cors');
usarExpress.use( cors() );




//-----construir servidor local---//
usarExpress.listen( 5000, () => {
   
    console.log(" el puerto 5000 esta en uso")

})


//------importar Rutas-----
const rutasClientes = require('./rutas/clientes');
usarExpress.use(rutasClientes);