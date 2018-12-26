'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = Schema({
    nombre: String,
    apellido: String,
    email: String,
    password: String,
    rol: String,
    image: String
});

module.exports = mongoose.model('usuario', userSchema);