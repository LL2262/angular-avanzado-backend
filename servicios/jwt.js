'use strict'

var jwt = require ('jwt-simple');
var moment = require ('moment');
var secret = 'clave_secreta_del_curso_angular_avanzado';

exports.createToken = function(issetUser){
    var payload = {
        sub: issetUser._id,
        nombre: issetUser.nombre,
        apellido: issetUser.apellido,
        email: issetUser.email,
        rol: issetUser.rol,
        image: issetUser.image,
        iat: moment().unix(),
        exp: moment().add(30, 'days').unix
    }

    return jwt.encode(payload, secret);
}