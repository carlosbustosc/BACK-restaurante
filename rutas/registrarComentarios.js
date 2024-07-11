// importamos express para usar el router

const express  = require('express');
const usarRuta = express.Router();



//traemos el archivo del controlador
const controladorComentarios = require('../controladores/registrarComentarios');



//creamos rutas
usarRuta.post("/registrarComentario", controladorComentarios.registrarComentario );


usarRuta.delete('/borrarComentario/:id', controladorComentarios.borrarComentario );

usarRuta.get('/cargarComentario', controladorComentarios.cargarComentarios)



//exportamos rutas
module.exports = usarRuta;
