//importar express
const express = require('express');

//usarmos router para las rutas
const usarRuta = express.Router();


//traemos el archivo de controladores
const controladorClientes = require('../controladores/clientes');


usarRuta.post('/registrarClienteCurso', controladorClientes.registrarClientes);
usarRuta.post('/loginClientesCurso', controladorClientes.loginClientes);
usarRuta.put('/actualizarUsuario', controladorClientes.ActualizarUsuario );








module.exports =  usarRuta 