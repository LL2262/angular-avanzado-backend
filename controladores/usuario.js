'use strict'

// Modulos
var bcrypt = require('bcrypt-nodejs');
var fs = require('fs');
var path = require('path');

//Modelos
var usuario = require('../modelos/usuario');

//Servicio JWT
var jwt = require('../servicios/jwt');

// Funciones
function pruebas(req, res){
    res.status(200).send({mensagge: 'Probando el controlador de usuarios y accion pruebas', user: req.user});

}

function saveUser(req, res){
    var user = new usuario();

    var params = req.body;

    if(params.password && params.nombre && params.apellido && params.email){
        user.nombre = params.nombre;
        user.apellido = params.apellido;
        user.email = params.email;
        user.rol = 'USUARIO';
        user.image = null;

        usuario.findOne({email: user.email.toLowerCase()}, (err, issetUser)=>{
            if(err){
                res.status(500).send({menssage: 'Error al comprobar el usuario'});
            }
            else{
                if(!issetUser){
                    bcrypt.hash(params.password, null, null, function(err, hash){
                        user.password = hash;
                        user.save((err, userStored)=>{
                            if(err){
                                res.status(500).send({menssage: 'error al guardar'});
                            }
                            else{
                                if(!userStored){
                                    res.status(400).send({menssage: 'No se registro el usuario'});
                                }
                                else{
                                    res.status(200).send({user: userStored});
                                }
                            }
                        });
                    });
                }
                else{
                    res.status(200).send({mensagge: 'Usuario repetido'});
                }
            }
        });

    }
    else{
        res.status(200).send({mensagge: 'Introduce los datos correctamente'});
    }

}

function login(req, res) {
    var params = req.body;

    var email = params.email;
    var password = params.password

    usuario.findOne({ email: email.toLowerCase() }, (err, issetUser) => {
        if (err) {
            res.status(500).send({ menssage: 'Error al comprobar el usuario' });
        }
        else {
            if (issetUser) {
                bcrypt.compare(password, issetUser.password, (err, check)=>{
                    if(check){
                        //Comprobar y generar token
                        if(params.gettoken){
                            res.status(200).send({
                                token: jwt.createToken(issetUser)
                            });
                        }else{
                            res.status(202).send({issetUser});
                        }
                    }else{
                        res.status(404).send({ messagge: 'Contraseña incorrecta' });
                    }
                });
            }
            else {
                res.status(404).send({ messagge: 'El usuario no existe' });
            }
        }
    });
}

function updateUser(req, res){
    var userId = req.params.id;
    var update = req.body;
    delete update.password;

    if(userId != req.user.sub){
        return res.status(500).send({ messagge: 'No tienes permiso para actualizar usuario'});
    }

    usuario.findByIdAndUpdate(userId, update, {new:true}, (err, userUpdate)=>{
        if(err){
            res.status(500).send({ messagge: 'Error al actualizar usuario'});
        }
        else{
            if(!userUpdate){
                res.status(404).send({ messagge: 'No se ha podido actualizar el usuario'});
            }else{
                res.status(200).send({ user: userUpdate});
            }
        }
    });
}

function uploadImage(req, res){
    var userId = req.params.id;
    var file_name = 'No subido';

    if(req.files){
        var file_path = req.files.image.path;
        var file_split = file_path.split('\\');
        var file_name = file_split[2];

        var ext_split = file_path.split('\.');
        var file_ext = ext_split[1];

        if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'jpeg' || file_ext == 'gif' ){

            if(userId != req.user.sub){
                return res.status(500).send({ messagge: 'No tienes permiso para actualizar usuario'});
            }
        
            usuario.findByIdAndUpdate(userId, {image: file_name}, {new:true}, (err, userUpdate)=>{
                if(err){
                    res.status(500).send({ messagge: 'Error al actualizar usuario'});
                }
                else{
                    if(!userUpdate){
                        res.status(404).send({ messagge: 'No se ha podido actualizar el usuario'});
                    }else{
                        res.status(200).send({ user: userUpdate});
                    }
                }
            });
        }
        else{
            fs.unlink(file_path, (err) =>{
                if(err){
                    res.status(200).send({ messagge: 'Extensión no valida y fichero no borrado'});
                }else{
                    res.status(200).send({ messagge: 'Extensión no valida'});
                }
            });
        }

        
    }
    else{
        res.status(200).send({ messagge: 'No se subieron archivos'});
    }
}

function getImageFile(req, res){
    var imageFile = req.params.imageFile;
    var path_file = './uploads/users/'+imageFile;

    fs.exists(path_file, function(exists){
        if(exists){
            res.sendFile(path.resolve(path_file));
        }
        else{
            res.status(404).send({ messagge: 'La imagen no existe'});
        }
    });
}

function getCuidadores(req, res){
    usuario.find({rol:'ADMINISTRADOR'}).exec((err, users) =>{
        if(err){
            res.status(500).send({ messagge: 'Error en la petición'});
        }else{
            if(!users){
                res.status(404).send({ messagge: 'No hay cuidadores'});
            }else{
                res.status(200).send({ users});
            }
        }
    });
}

module.exports = {
    pruebas,
    saveUser,
    login,
    updateUser,
    uploadImage,
    getImageFile,
    getCuidadores
};