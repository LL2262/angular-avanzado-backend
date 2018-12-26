'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// Cargar rutas
var user_routes = require ('./rutas/usuario');
var animal_rutes = require('./rutas/animal')

// Middlewares de body.parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Configurar cabeceras y cors
app.use((req, res, next) =>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', ' Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// Rutas base
app.use('/api', user_routes);
app.use('/api', animal_rutes);


module.exports = app;