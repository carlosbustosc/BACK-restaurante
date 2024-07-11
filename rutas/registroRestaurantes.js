// importamos express para usar el router

const express  = require('express');
const usarRuta = express.Router()


// importamos archivo de controladores
const controladorRestaurante = require('../controladores/registroRestaurante');


usarRuta.post("/registroResturante", controladorRestaurante.registrarRestaurante);
usarRuta.post("/loginRestaurante", controladorRestaurante.loginRestaurante )
usarRuta.get("/listarRestaurantes", controladorRestaurante.listarRestaurantes );

usarRuta.get("/traerUnRestaurante/:id", controladorRestaurante.traerUnRestaurante)


//exportamos rutas
module.exports = usarRuta