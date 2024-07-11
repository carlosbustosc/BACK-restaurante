//-----importamos express
const express = require('express');
const usarRuta = express.Router();// usamos express router para las rutas



//----importamos archivo controlador----
const controladorClientes = require('../controladores/registroClientes')


// creamos las rutas
usarRuta.post('/registrarCliente', controladorClientes.registrarCliente);
usarRuta.post('/loginClientes', controladorClientes.loginClientes)



//----expotamos rutas
module.exports = usarRuta;