//importar express para usar el router

const express  = require('express');
const usarRuta = express.Router();


//importar controlador
const controladorPerfil = require('../controladores/perfil');


//crear rutas
usarRuta.post('/traerUnCliente', controladorPerfil.traerUnPerfil );
usarRuta.post('/guardarFotoPerfil', controladorPerfil.registrarfotoPerfil)
usarRuta.post('/listarFotoPerfil', controladorPerfil.listarFotoPerfil )

usarRuta.put('/actualizarInformacionPerfil', controladorPerfil.actualizarInformacionPerfil)





//exportar rutas
module.exports = usarRuta