'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var animalSchema = Schema({
    nombre: String,
    descripcion: String,
    ano: String,
    image: String,
    usuario: {type: Schema.ObjectId, ref: 'usuario'}
});

module.exports = mongoose.model('animales', animalSchema);