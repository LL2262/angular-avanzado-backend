'use strict'

exports.isAdmin = function(req, res, next){
    if(req.user.rol != 'ADMINISTRADOR'){
        return res.status(200).send({menssage: 'No tienes acceso a esta zona'});
    }

    next();
}