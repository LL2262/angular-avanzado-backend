'use strict'

var express = require('express');
var animalController = require('../controladores/animal');

var api = express.Router();
var md_auth = require('../midelwares/authenticated');
var md_admin = require('../midelwares/isAdmin');

var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: './uploads/animals'});

api.get('/prueba-animales',md_auth.ensureAuth, animalController.pruebas);
api.post('/save-animal',md_auth.ensureAuth, md_admin.isAdmin, animalController.saveAnimal);
api.get('/animales', animalController.getAnimals);
api.get('/animal/:id', animalController.getAnimal);
api.put('/update-animal/:id',md_auth.ensureAuth, md_admin.isAdmin, animalController.updateAnimal);
api.post('/upload-image-animal/:id',md_auth.ensureAuth, md_admin.isAdmin, md_upload, animalController.uploadImage);
api.get('/get-image-animal/:imageFile', animalController.getImageFile);
api.delete('/delete-animal/:id',md_auth.ensureAuth, md_admin.isAdmin, animalController.deleteAnimal);

module.exports = api;