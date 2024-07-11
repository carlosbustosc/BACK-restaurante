const express  = require('express');
const usarRuta = express.Router()



//traemos el controlador 
const mensajes = require("../controladores/mensajes");



//creamos las rutas
usarRuta.post("/guardarMensajes", mensajes.guardarMensajesResturantes);
usarRuta.post("/guardarClientes", mensajes.guardarMensajeClientes);

usarRuta.get('/listarClientes', mensajes.listarMensajesClientes);
usarRuta.get('/listarMensajesRestaurantes/:correo', mensajes.listarMensajesRestaurantes);


usarRuta.delete("/borrarMensajes/:id", mensajes.borrarMensajeRestaurante )
usarRuta.delete("/borrarMensajesClientes/:id", mensajes.borrarMensajesCliente )


//exportamos ruta
module.exports = usarRuta

