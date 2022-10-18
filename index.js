const express = require('express');
const path = require('path');
require('dotenv').config();

//DB Config

const { dbConnection } = require('./database/config');

dbConnection();

//App de express
const app = express();

// Lectura y parseo del Body
app.use( express.json() );

//Node server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket');




// Path público
const publicPath = path.resolve( __dirname, 'public' );

app.use( express.static( publicPath ));


//Mis rutas

app.use('/api/user', require('./routes/auth.js'));
//app.use( '/api/movies', require('./routes/movies'));


server.listen(process.env.PORT, ( err ) => {
    if (err) throw new Error(err);
});