//----importamos la conexion----
const { conexion } = require('./BaseDatos/conexion');
conexion();


//--------Crear el servidor---------

//importamos express
const cors = require('cors');
const express = require('express');
const usarExpress = express();

const bodyParser = require('body-parser');


//----configuracion de datos de entrada
usarExpress.use( cors({
     origin: 'http://localhost:4200',
    credentials: true
}));

//----tranformar body a objeto JSON
usarExpress.use( bodyParser.json( { limit: '12mb' } ) );

//-----configurar URL encoded---
usarExpress.use( express.urlencoded( { extended:true } ) )



//crear servidor local y escuchar peticiones http


usarExpress.listen(5000, (req, resp) => {
    console.log('servidor corriendo');
})
    
    




//-------importamos rutas---------
const rutasRegistroClientes = require('./rutas/registroClientes');
usarExpress.use(rutasRegistroClientes);

const rutasRegistroRestaurante = require("./rutas/registroRestaurantes");
usarExpress.use(rutasRegistroRestaurante);

const rutasDomicilios = require("./rutas/registroDomicilios");
usarExpress.use(rutasDomicilios)

const rutasComentarios = require('./rutas/registrarComentarios')
usarExpress.use(rutasComentarios)

const rutaPerfil = require('./rutas/perfil');
usarExpress.use(rutaPerfil)

const favoritos = require('./rutas/registroFavoritos');
usarExpress.use(favoritos)

const rutasNotificaciones = require('./rutas/notificaciones');
usarExpress.use( rutasNotificaciones );

const rutasMensajes = require("./rutas/mensajes");
usarExpress.use(rutasMensajes)