'use strict'

var mongoose = require('mongoose');
var app = require ('./app');
var port = process.env.port || 3789;

mongoose.connect('mongodb://localhost:27017/zoo', {useNewUrlParser: true})
    .then(
        console.log('Conexión exitosa...!'),
        app.listen(port, () => {
            console.log('El servidor local con Node y Express corriendo correctamente...!')
        })
    )
    .catch(
       err => console.log(err) 
    );