//---importamos express
const express = require('express');
const usarRuta = express.Router();


//traer controlador
const controlador = require('../controladores/registroFavoritos');


//crear ruta
usarRuta.post('/registroFavorito', controlador.registrarFavoritos );
usarRuta.get('/traerFavorito/:email', controlador.listarRestaurantesFavoritos )

usarRuta.delete('/borrarFavorito/:id', controlador.borrarUnFavorito )




module.exports = usarRuta;