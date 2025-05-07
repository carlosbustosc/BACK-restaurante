//importar express
const express = require('express');

//usarmos router para las rutas
const usarRuta = express.Router();


//traemos el archivo de controladores
const controladorClientes = require('../controladores/clientes');


usarRuta.post('/registrarClienteCurso', controladorClientes.registrarClientes);








module.exports =  usarRuta 