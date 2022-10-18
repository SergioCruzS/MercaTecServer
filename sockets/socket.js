const { io } = require('../index');

io.on('connection', client => {
    //console.log('Cliente Conectado')
  
    client.on('disconnect',() => {
       //console.log('Cliente Desconectado');
    });
    
});