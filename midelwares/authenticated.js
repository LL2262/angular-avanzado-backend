'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'clave_secreta_del_curso_angular_avanzado';

exports.ensureAuth = function(req, res, next){
    if(!req.headers.authorization){
        return res.status(403).send({message: 'La pericion no tiene la cabezera de autenticación'});
    }
    
    var token = req.headers.authorization.replace(/['"]+/g, '');

    try{
        var payload = jwt.decode(token, secret);

        if(payload<=moment().unix()){
            return res.status(401).send({menssage: 'El token ha expirado'});
        }   
    }catch(ex){
        return res.status(404).send({menssage: 'El token no es valido'});
    }

    req.user = payload;

    next();

}