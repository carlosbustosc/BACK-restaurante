//importamos express
const express = require('express');
const usarRuta = express.Router()

// importar controlador
const controladorNotificaciones = require('../controladores/notificaciones');


//crear rutas
usarRuta.post('/guardarNotificacion', controladorNotificaciones.guardarNotificaciones )

usarRuta.get('/traerGestinados/:estado', controladorNotificaciones.traerGestionados)

usarRuta.delete('/borrarGestionado/:id', controladorNotificaciones.eliminarGestionado )

usarRuta.get('/listarNotificaciones', controladorNotificaciones.listarNotificacionesAlCliente)

usarRuta.delete('/borrarNotificacion/:id', controladorNotificaciones.borrarNotificacionCliente )


//exportamos rutas
module.exports = usarRuta;
