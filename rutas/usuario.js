'use strict'

var express = require('express');
var usuarioController = require('../controladores/usuario');

var api = express.Router();
var md_auth = require('../midelwares/authenticated');

var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: './uploads/users'});

api.get('/prueba-controlador',md_auth.ensureAuth, usuarioController.pruebas);
api.post('/registro', usuarioController.saveUser);
api.post('/login', usuarioController.login);
api.put('/update-user/:id',md_auth.ensureAuth, usuarioController.updateUser);
api.post('/upload-image-user/:id',md_auth.ensureAuth, md_upload, usuarioController.uploadImage);
api.get('/get-image-file/:imageFile', usuarioController.getImageFile);
api.get('/cuidadores', usuarioController.getCuidadores);

module.exports = api;