//importamos express para usar el router
const express  = require('express');
const usarRuta = express.Router();


//traemos el archivo de controlador
const controladorDomicilios = require("../controladores/registroDomicilios");


//creamos rutas
usarRuta.post('/registrarDomicilio', controladorDomicilios.registrarDomicilio );

usarRuta.post('/domiciliosPerfil', controladorDomicilios.traerDomiciliosSegunElPerfil );

usarRuta.delete( '/borrarDomicilio/:id', controladorDomicilios.borrarUnDomicilio )

usarRuta.get( '/listarDomicilios/:email',  controladorDomicilios.domiciliosParaPerfilRestaurante )



//exportamos ruta
module.exports = usarRuta;